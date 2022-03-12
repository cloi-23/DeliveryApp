import { IsString } from "class-validator";

export class CreateDriverDto {
  
  @IsString()
  name: string;

  @IsString()
  contact: string;

  @IsString()
  address: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
  
  @IsString()
  device: string
}