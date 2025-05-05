import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

// import { Type } from 'class-transformer';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string | null;
}

export class UpdatePostDto extends PartialType(CreatePostDto) { }

export class FilterPostDto extends UpdatePostDto {
    @IsOptional()
    // @Type(() => String)
    @IsString()
    id?: string;
}

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
