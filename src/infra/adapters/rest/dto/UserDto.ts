import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João da silva',
  })
  @IsString()
  @IsNotEmpty()
  public name: string

  @ApiProperty({
    description: 'Endereço de email do usuário',
    example: 'endereco@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string
}

export class GetUserDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 'cb146ed8-faee-4975-9e8d-4004f65f9cdc',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public id: string

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João da silva',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public name: string

  @ApiProperty({
    description: 'Endereço de email do usuário',
    example: 'endereco@email.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string

  @ApiProperty({
    description: 'Idade do usuário',
    example: 25,
    type: 'number | null',
  })
  @IsNumber()
  public age: number | null

  @ApiProperty({
    description: 'Cidade que o usuário reside',
    example: 'Campos dos Goytacazes',
    type: 'string | null',
  })
  @IsString()
  public city: string | null
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João da silva',
    required: false,
  })
  @IsString()
  @IsOptional()
  public name?: string

  @ApiProperty({
    description: 'Endereço de email do usuário',
    example: 'endereco@email.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  public email?: string

  @ApiProperty({
    description: 'Idade do usuário',
    example: 25,
    required: false,
  })
  @IsOptional()
  public age?: number

  @ApiProperty({
    description: 'Cidade que o usuário reside',
    example: 'Campos dos Goytacazes',
    required: false,
  })
  @IsOptional()
  public city?: string
}
