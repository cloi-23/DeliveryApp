import { IsString } from 'class-validator';

export class CreateManagerDto {
  @IsString()
  name: string;

  @IsString()
  contact: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
