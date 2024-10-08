import { IsString, IsDecimal } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDecimal()
  price: number;
}
