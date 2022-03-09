import { IsString } from 'class-validator';

export class LoginManagerDto {
    
  @IsString()
  username: string;

  @IsString()
  password: string;
}
