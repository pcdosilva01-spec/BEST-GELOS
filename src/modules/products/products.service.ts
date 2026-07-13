import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma, ProductCategory, PrismaClient } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    // Generate slug from name
    const slug = this.generateSlug(dto.name);

    // Check if slug exists
    const existingSlug = await this.prisma.product.findUnique({ where: { slug } });
    if (existingSlug) {
      // Add random suffix to make unique
      const uniqueSlug = `${slug}-${Date.now().toString(36).slice(-6)}`;
      return this.prisma.product.create({
        data: {
          ...dto,
          slug: uniqueSlug,
        },
      });
    }

    return this.prisma.product.create({
      data: {
        ...dto,
        slug,
      },
    });
  }

  async findAll(query: ProductQueryDto) {
    const { page = 1, limit = 12, category, search, featured, sortBy = 'sortOrder', sortOrder = 'asc' } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      isActive: true,
      ...(category && { category }),
      ...(featured !== undefined && { isFeatured: featured }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          category: true,
          weight: true,
          price: true,
          imageUrl: true,
          stock: true,
          isFeatured: true,
          createdAt: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async findFeatured() {
    return this.prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      orderBy: { sortOrder: 'asc' },
      take: 6,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        category: true,
        weight: true,
        price: true,
        imageUrl: true,
        stock: true,
        isFeatured: true,
      },
    });
  }

  async getCategories() {
    const categories = await this.prisma.product.groupBy({
      by: ['category'],
      where: { isActive: true },
      _count: { category: true },
    });

    return categories.map((c) => ({
      category: c.category,
      count: c._count.category,
      label: this.getCategoryLabel(c.category),
    }));
  }

  async findOne(identifier: string) {
    // Try to find by ID first, then by slug
    const isCuid = /^c[a-z0-9]{24}$/.test(identifier);

    const product = await this.prisma.product.findUnique({
      where: isCuid ? { id: identifier } : { slug: identifier },
      include: {
        orderItems: {
          select: { quantity: true },
          take: 1,
        },
      },
    });

    if (!product || !product.isActive) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async findAllAdmin(includeInactive = false) {
    return this.prisma.product.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: [{ isActive: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async getStats() {
    const [total, active, inactive, lowStock, featured, totalStock, totalValue] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.product.count({ where: { isActive: true } }),
      this.prisma.product.count({ where: { isActive: false } }),
      this.prisma.product.count({ where: { stock: { lte: this.prisma.product.fields.minStock } } }),
      this.prisma.product.count({ where: { isFeatured: true, isActive: true } }),
      this.prisma.product.aggregate({ _sum: { stock: true } }),
      this.prisma.product.aggregate({
        where: { isActive: true },
        _sum: { price: true },
      }),
    ]);

    return {
      total,
      active,
      inactive,
      lowStock,
      featured,
      totalStock: totalStock._sum.stock || 0,
      avgPrice: totalValue._sum.price ? Number(totalValue._sum.price) / active : 0,
    };
  }

  async findOneAdmin(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        orderItems: {
          take: 10,
          include: {
            order: { select: { id: true, orderNumber: true, status: true, createdAt: true } },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOneAdmin(id); // Throws if not found

    const data: Prisma.ProductUpdateInput = { ...dto };

    if (dto.name) {
      data.slug = this.generateSlug(dto.name);
    }

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async updateStock(id: string, stock: number, operation: 'set' | 'add' | 'subtract' = 'set') {
    const product = await this.findOneAdmin(id);

    let newStock: number;
    switch (operation) {
      case 'add':
        newStock = product.stock + stock;
        break;
      case 'subtract':
        newStock = Math.max(0, product.stock - stock);
        break;
      default:
        newStock = stock;
    }

    return this.prisma.product.update({
      where: { id },
      data: { stock: newStock },
    });
  }

  async reorder(ids: string[]) {
    await this.prisma.$transaction(
      ids.map((id, index) =>
        this.prisma.product.update({
          where: { id },
          data: { sortOrder: index },
        }),
      ),
    );

    return { message: 'Ordem atualizada com sucesso' };
  }

  async softDelete(id: string) {
    await this.findOneAdmin(id);
    return this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Spaces to hyphens
      .replace(/-+/g, '-') // Multiple hyphens to one
      .trim();
  }

  private getCategoryLabel(category: ProductCategory): string {
    const labels: Record<ProductCategory, string> = {
      CUBES: 'Gelo em Cubos',
      CRUSHED: 'Gelo Triturado',
      SPECIAL: 'Gelo Especial',
      BAGGED: 'Gelo Ensacado',
      BULK: 'Gelo a Granel',
      DRY_ICE: 'Gelo Seco',
    };
    return labels[category] || category;
  }
}