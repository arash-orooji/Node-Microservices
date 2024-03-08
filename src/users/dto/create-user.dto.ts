import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty()
  gender: string;
  @IsNotEmpty()
  avatar: Buffer;
}
