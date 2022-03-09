import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  productId: string

  @IsString()
  userId: string

  @IsNumber()
  quantity: number
}
