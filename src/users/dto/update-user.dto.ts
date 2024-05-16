import { CreateUserDto } from './create-user.dto';

import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// export class UpdateUserDto {
//   name?: string;
//   email?: string;
//   role?: 'INTERN' | 'ADMIN' | 'ENGINNER';
// }
