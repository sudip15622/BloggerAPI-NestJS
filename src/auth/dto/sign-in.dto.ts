import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
