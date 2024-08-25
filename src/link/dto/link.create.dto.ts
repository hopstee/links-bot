import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class LinkCreateDto {
    @IsNotEmpty()
    @IsString()
    link: string

    @IsNotEmpty()
    @IsString()
    linkCode: string

    @IsNotEmpty()
    @IsNumber()
    userId: number
}