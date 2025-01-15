import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

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
