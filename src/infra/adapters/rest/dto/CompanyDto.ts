import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Multimidia LTDA',
  })
  @IsString()
  @IsNotEmpty()
  public name: string
}
