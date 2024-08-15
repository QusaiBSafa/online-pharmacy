import { IsEnum, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateUserDto {
  @Expose()
  @IsString()
  username: string;

  @Expose()
  @IsString()
  password: string;

  @Expose()
  @IsEnum(UserRole)
  role: UserRole;
}
