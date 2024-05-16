import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsEnum(['INTERN', 'ADMIN', 'ENGINNER'], {
    message: 'valid role required',
  })
  role: 'INTERN' | 'ADMIN' | 'ENGINNER';
}
