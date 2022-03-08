import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString() 
  @IsOptional()
  name: string

  @IsOptional()
  @IsString()
  establishment: string

  @IsNumber()
  @IsOptional()
  price: number
}