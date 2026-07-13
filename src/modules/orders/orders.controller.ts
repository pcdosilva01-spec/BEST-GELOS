import { Controller, Get, Post, Body, Param, Patch, Query, UseGuards, HttpCode, HttpStatus, Request, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto, OrderQueryDto, CancelOrderDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdminRole, OrderStatus } from '@prisma/client';
import { Response } from 'express';

@ApiTags('Pedidos - Cliente')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou estoque insuficiente' })
  async create(@Body() dto: CreateOrderDto, @Request() req: any) {
    return this.ordersService.create(req.user.sub, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar meus pedidos' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
  @ApiResponse({ status: 200, description: 'Lista de pedidos' })
  async findMyOrders(@Query() query: OrderQueryDto, @Request() req: any) {
    return this.ordersService.findMyOrders(req.user.sub, query);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estatísticas dos meus pedidos' })
  @ApiResponse({ status: 200, description: 'Estatísticas' })
  async getMyStats(@Request() req: any) {
    return this.ordersService.getCustomerStats(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes do pedido' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  async findOne(@Param('id') id: string, @Request() req: any) {
    return this.ordersService.findOne(id, req.user.sub);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancelar pedido' })
  @ApiResponse({ status: 200, description: 'Pedido cancelado' })
  @ApiResponse({ status: 400, description: 'Pedido não pode ser cancelado' })
  async cancel(@Param('id') id: string, @Body() dto: CancelOrderDto, @Request() req: any) {
    return this.ordersService.cancel(id, req.user.sub, dto.reason);
  }

  @Post(':id/whatsapp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Enviar pedido via WhatsApp' })
  @ApiResponse({ status: 200, description: 'Link do WhatsApp gerado' })
  async sendWhatsApp(@Param('id') id: string, @Request() req: any) {
    return this.ordersService.generateWhatsAppLink(id, req.user.sub);
  }
}

@ApiTags('Pedidos - Admin')
@Controller('admin/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.MANAGER, AdminRole.OPERATOR)
export class AdminOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos pedidos (admin)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Lista de pedidos' })
  async findAll(@Query() query: OrderQueryDto) {
    return this.ordersService.findAllAdmin(query);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estatísticas gerais de pedidos' })
  @ApiResponse({ status: 200, description: 'Estatísticas' })
  async getStats(@Query('period') period?: 'today' | 'week' | 'month' | 'year') {
    return this.ordersService.getAdminStats(period);
  }

  @Get('recent')
  @ApiOperation({ summary: 'Pedidos recentes para dashboard' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Pedidos recentes' })
  async getRecent(@Query('limit') limit?: number) {
    return this.ordersService.getRecentOrders(limit || 10);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes completos do pedido (admin)' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  async findOneAdmin(@Param('id') id: string) {
    return this.ordersService.findOneAdmin(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar pedido (admin)' })
  @ApiResponse({ status: 200, description: 'Pedido atualizado' })
  async update(@Param('id') id: string, @Body() dto: Partial<CreateOrderDto>) {
    return this.ordersService.update(id, dto);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar status do pedido' })
  @ApiResponse({ status: 200, description: 'Status atualizado' })
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto, @Request() req: any) {
    return this.ordersService.updateStatus(id, dto, req.user.sub);
  }

  @Post(':id/status-history')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar entrada no histórico de status' })
  @ApiResponse({ status: 201, description: 'Histórico adicionado' })
  async addStatusHistory(@Param('id') id: string, @Body() body: { status: OrderStatus; notes?: string }, @Request() req: any) {
    return this.ordersService.addStatusHistory(id, body.status, body.notes, req.user.sub);
  }

  @Get('export/csv')
  @ApiOperation({ summary: 'Exportar pedidos para CSV' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
  @ApiResponse({ status: 200, description: 'Arquivo CSV' })
  async exportCsv(@Query() query: OrderQueryDto, @Res() res: Response) {
    const csv = await this.ordersService.exportToCsv(query);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="pedidos-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csv);
  }
}