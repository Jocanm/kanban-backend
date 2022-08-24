import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";

export class UpdateTaskDto {

    @IsString()
    @MinLength(3)
    @IsOptional()
    title?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SubTask)
    subTasks: SubTask[];

    @IsString()
    @IsUUID()
    stateId: string;

}

class SubTask {

    @IsString()
    @MinLength(3)
    title: string;

    @IsBoolean()
    done: boolean;

}