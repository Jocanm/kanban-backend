import { IsString, MinLength } from "class-validator";

export class CreateSubTaskDto {

    @IsString()
    @MinLength(3)
    title:string

}
