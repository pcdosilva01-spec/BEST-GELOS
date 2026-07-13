import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdminRole } from '@prisma/client';

@ApiTags('Produtos - Público')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar produtos com filtros e paginação' })
  @ApiResponse({ status: 200, description: 'Lista de produtos' })
  async findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Listar produtos em destaque' })
  @ApiResponse({ status: 200, description: 'Produtos em destaque' })
  async findFeatured() {
    return this.productsService.findFeatured();
  }

  @Get('categories')
  @ApiOperation({ summary: 'Listar categorias de produtos' })
  @ApiResponse({ status: 200, description: 'Categorias disponíveis' })
  async getCategories() {
    return this.productsService.getCategories();
  }

  @Get(':identifier')
  @ApiOperation({ summary: 'Obter produto por ID ou slug' })
  @ApiResponse({ status: 200, description: 'Produto encontrado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async findOne(@Param('identifier') identifier: string) {
    return this.productsService.findOne(identifier);
  }
}

@ApiTags('Produtos - Admin')
@Controller('admin/products')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.MANAGER, AdminRole.OPERATOR)
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos produtos (admin)' })
  @ApiQuery({ name: 'includeInactive', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Lista completa de produtos' })
  async findAllAdmin(@Query('includeInactive') includeInactive?: string) {
    return this.productsService.findAllAdmin(includeInactive === 'true');
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estatísticas de produtos' })
  @ApiResponse({ status: 200, description: 'Estatísticas' })
  async getStats() {
    return this.productsService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter produto por ID (admin)' })
  @ApiResponse({ status: 200, description: 'Produto encontrado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async findOneAdmin(@Param('id') id: string) {
    return this.productsService.findOneAdmin(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Patch(':id/stock')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar estoque do produto' })
  @ApiResponse({ status: 200, description: 'Estoque atualizado' })
  async updateStock(@Param('id') id: string, @Body() body: { stock: number; operation?: 'set' | 'add' | 'subtract' }) {
    return this.productsService.updateStock(id, body.stock, body.operation || 'set');
  }

  @Patch('reorder')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reordenar produtos' })
  @ApiResponse({ status: 200, description: 'Ordem atualizada' })
  async reorder(@Body() body: { ids: string[] }) {
    return this.productsService.reorder(body.ids);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir produto (soft delete)' })
  @ApiResponse({ status: 204, description: 'Produto desativado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async delete(@Param('id') id: string) {
    return this.productsService.softDelete(id);
  }
}