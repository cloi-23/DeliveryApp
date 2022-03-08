import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  
  @IsString()
  productId: string;

  @IsNumber()
  price: number

  @IsNumber()
  quantity: number
}
