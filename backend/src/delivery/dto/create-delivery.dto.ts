import { IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  userId: string
  
  @IsString()
  driverId: string
  
  @IsString()
  orderId: string;
}
