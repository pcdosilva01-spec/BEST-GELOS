import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdminRole } from '@prisma/client';

@ApiTags('Dashboard - Admin')
@Controller('admin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.MANAGER)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Estatísticas gerais para dashboard' })
  @ApiResponse({ status: 200, description: 'Estatísticas do dashboard' })
  async getStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('charts/revenue')
  @ApiOperation({ summary: 'Dados de faturamento para gráficos' })
  @ApiQuery({ name: 'period', required: false, enum: ['week', 'month', 'year'], example: 'month' })
  @ApiResponse({ status: 200, description: 'Dados de faturamento' })
  async getRevenueChart(@Query('period') period?: 'week' | 'month' | 'year') {
    return this.adminService.getRevenueChart(period || 'month');
  }

  @Get('charts/orders')
  @ApiOperation({ summary: 'Dados de pedidos para gráficos' })
  @ApiQuery({ name: 'period', required: false, enum: ['week', 'month', 'year'], example: 'month' })
  @ApiResponse({ status: 200, description: 'Dados de pedidos' })
  async getOrdersChart(@Query('period') period?: 'week' | 'month' | 'year') {
    return this.adminService.getOrdersChart(period || 'month');
  }

  @Get('charts/products')
  @ApiOperation({ summary: 'Produtos mais vendidos' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Top produtos' })
  async getTopProducts(@Query('limit') limit?: number) {
    return this.adminService.getTopProducts(limit || 10);
  }

  @Get('recent-orders')
  @ApiOperation({ summary: 'Pedidos recentes' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Pedidos recentes' })
  async getRecentOrders(@Query('limit') limit?: number) {
    return this.adminService.getRecentOrders(limit || 10);
  }

  @Get('alerts')
  @ApiOperation({ summary: 'Alertas do sistema (estoque baixo, pedidos pendentes, etc)' })
  @ApiResponse({ status: 200, description: 'Lista de alertas' })
  async getAlerts() {
    return this.adminService.getAlerts();
  }
}