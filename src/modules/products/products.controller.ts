import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
  } from '@nestjs/common';
  import { ProductsService } from './products.service';
  import { CreateProductDto } from './dtos/create-product.dto';
  import { UpdateProductDto } from './dtos/update-product.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../auth/roles.guard';
  import { Roles } from '../auth/roles.decorator';
  import { UserRole } from '../users/entities/user.entity';
  
  @Controller('products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Roles(UserRole.ADMIN)
    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
      return this.productsService.createProduct(createProductDto);
    }
  
    @Roles(UserRole.ADMIN)
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateProductDto: UpdateProductDto,
    ) {
      return this.productsService.updateProduct(+id, updateProductDto);
    }
  
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.productsService.removeProduct(+id);
    }
  }
  