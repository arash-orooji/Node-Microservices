import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    firstName: string;
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    lastName: string;
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    gender: string;
    @IsNotEmpty()
    avatar: string;
}
