import { IsString } from 'class-validator';

export class CreateSalesDto {
  @IsString()
  orderId: string
  
}