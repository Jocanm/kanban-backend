import { IsArray, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @MinLength(3)
    description: string;

    @IsArray()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    @IsOptional()
    subTasks?: string[];

}
