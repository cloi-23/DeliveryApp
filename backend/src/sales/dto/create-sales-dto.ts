import { IsString,IsDate } from 'class-validator';

export class CreateSalesDto {
  @IsString()
  orderId: string
  
  @IsString()
  date: string;
}