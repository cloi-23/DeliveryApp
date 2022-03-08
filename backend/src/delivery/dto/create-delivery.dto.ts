import { IsString } from 'class-validator';

export class CreateDeliveryDto {

  @IsString()
  driverId: string
  
  @IsString()
  userId: string;
  
  @IsString()
  orderId: string;

  @IsString()
  orderDate: Date;

  @IsString()
  status: string
  
  @IsString()
  deliveredDate: Date

}
