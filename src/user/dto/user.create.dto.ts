import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UserCreateDto {
    @IsNotEmpty()
    @IsNumber()
    telegramId: number
    
    @IsString()
    username?: string

    @IsString()
    firstName?: string

    @IsString()
    lastName?: string
}