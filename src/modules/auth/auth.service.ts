import { Injectable, UnauthorizedException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto, ip: string, userAgent: string) {
    // Check if email exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: passwordHash,
        phone: dto.phone,
        userType: 'CUSTOMER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        userType: true,
        createdAt: true,
      },
    });

    // Create customer profile
    await this.prisma.customer.create({
      data: {
        name: dto.name,
        phone: dto.phone || '',
        email: dto.email,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, 'CUSTOMER');

    // Save refresh token
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    // Log audit
    await this.logAudit('USER_REGISTER', 'users', user.id, null, user, ip, userAgent);

    return { ...tokens, user };
  }

  async login(dto: LoginDto, ip: string, userAgent: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    const tokens = await this.generateTokens(user.id, user.userType);
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    await this.logAudit('USER_LOGIN', 'users', user.id, null, { email: user.email }, ip, userAgent);

    const { password: _, ...userWithoutPassword } = user;
    return { ...tokens, user: userWithoutPassword };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token não fornecido');
    }

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }

    if (!storedToken.user.isActive) {
      throw new UnauthorizedException('Usuário desativado');
    }

    // Revoke old token
    await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });

    // Generate new tokens
    const tokens = await this.generateTokens(storedToken.userId, storedToken.user.userType);
    await this.saveRefreshToken(storedToken.userId, tokens.refreshToken);

    const { password: _, ...userWithoutPassword } = storedToken.user;
    return { ...tokens, user: userWithoutPassword };
  }

  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
    await this.logAudit('USER_LOGOUT', 'users', userId, null, null, '', '');
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        userType: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        addresses: true,
        orders: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: { id: true, orderNumber: true, status: true, total: true, createdAt: true },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return user;
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Always return success for security (don't reveal if email exists)
    if (!user) {
      return { message: 'Se o email estiver cadastrado, enviaremos instruções' };
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.prisma.passwordResetToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        expiresAt,
      },
    });

    // TODO: Send email with reset link
    this.logger.log(`Password reset token for ${email}: ${resetToken}`);

    return { message: 'Se o email estiver cadastrado, enviaremos instruções' };
  }

  async resetPassword(token: string, password: string) {
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    if (resetToken.usedAt) {
      throw new BadRequestException('Token já utilizado');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: passwordHash },
      }),
      this.prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
    ]);

    // Invalidate all refresh tokens
    await this.prisma.refreshToken.deleteMany({ where: { userId: resetToken.userId } });

    return { message: 'Senha alterada com sucesso. Faça login novamente.' };
  }

  private async generateTokens(userId: string, userType: string) {
    const payload = { sub: userId, type: userType };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = randomBytes(64).toString('hex');

    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: string, token: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await this.prisma.refreshToken.create({
      data: { token, userId, expiresAt },
    });
  }

  private async logAudit(
    action: string,
    entity: string,
    entityId: string,
    oldData: any,
    newData: any,
    ip: string,
    userAgent: string,
  ) {
    await this.prisma.auditLog.create({
      data: { action, entity, entityId, oldData, newData, ipAddress: ip, userAgent },
    }).catch((e) => this.logger.error('Audit log failed', e));
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        userType: true,
        isActive: true,
      },
    });
    return user;
  }

  async validateAdmin(adminId: string) {
    const admin = await this.prisma.adminUser.findUnique({
      where: { id: adminId, isActive: true },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });
    return admin;
  }
}