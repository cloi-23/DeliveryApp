import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  productId: string

  @IsOptional()
  @IsString()
  userId: string

  @IsOptional()
  @IsNumber()
  quantity: number

  @IsString()
  @IsOptional()
  status: string
}
