import { IsString } from 'class-validator';

export class LoginDriveDto {
    
  @IsString()
  username: string;

  @IsString()
  password: string;
}
