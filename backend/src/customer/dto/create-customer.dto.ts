import { IsString } from 'class-validator';

export class CreateCustomerDto {
  
  @IsString()
  name: string;
  
  @IsString()
  address: string;

  @IsString()
  contact: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
