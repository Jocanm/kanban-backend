import { ArrayMinSize, ArrayNotEmpty, IsArray, IsString, MinLength } from "class-validator";

export class CreateBoardDto {

    @IsString()
    @MinLength(3)
    title: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(2)
    @IsString({ each: true })
    states: string[]

}