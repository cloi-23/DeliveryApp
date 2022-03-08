import { IsNumber, IsString } from 'class-validator';

export class CreatePurchaseDto {
  
  @IsString()
  productId: string;

  @IsNumber()
  cost: number

  @IsNumber()
  quantity: number
}
