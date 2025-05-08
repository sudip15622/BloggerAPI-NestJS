import { UpdatePostDto } from "./update-post.dto";
import { IsOptional, IsString } from "class-validator"

export class FilterPostDto extends UpdatePostDto {
    @IsOptional()
    // @Type(() => String)
    @IsString()
    id?: string;
}