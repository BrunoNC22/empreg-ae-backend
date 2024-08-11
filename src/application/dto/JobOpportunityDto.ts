import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsDateString,
  IsIn,
  IsObject,
  IsNotEmpty,
} from 'class-validator'
import { ContactType } from 'src/domain/types/ContactType'
import { LocationType } from 'src/domain/types/LocationType'

export class CreateJobOpportunityDto {
  @ApiProperty({
    description: 'UUID da empresa responsável pela vaga de emprego.',
    example: 'ab621ba9-36b3-4357-b021-73cde7b79b73',
  })
  @IsString()
  @IsNotEmpty()
  public companyId: string

  @ApiProperty({
    description:
      'Localização do ambiente de trabalho, caso a vaga seja presencial.',
    example: {
      state: 'RJ',
      city: 'La ele city',
    },
    required: false,
  })
  @IsObject()
  public location: LocationType

  @ApiProperty({
    description: 'Título da vaga de trabalho.',
    example: 'Desenvolvedor Full Stack',
  })
  @IsString()
  @IsNotEmpty()
  public title: string

  @ApiProperty({
    description: 'Tipo de contrato da vaga.',
    example: 'clt',
    enum: ['internship', 'scholarship', 'clt', 'pj'],
  })
  @IsIn(['internship', 'scholarship', 'clt', 'pj'])
  public type: 'internship' | 'scholarship' | 'clt' | 'pj'

  @ApiProperty({
    description: 'Salário oferecido pela vaga.',
    example: 5000,
  })
  @IsNumber()
  public salary: number

  @ApiProperty({
    description: 'Lista de benefícios oferecidos pela vaga.',
    example: ['Vale Refeição', 'Plano de Saúde'],
    type: [String],
  })
  @IsArray()
  public benefits: string[]

  @ApiProperty({
    description: 'Lista de requisitos para a vaga.',
    example: [
      'Conhecimento em Typescript',
      'Experiência com testes automatizados',
    ],
    type: [String],
  })
  @IsArray()
  public requirements: string[]

  @ApiProperty({
    description: 'Descrição detalhada da vaga.',
    example:
      'Buscamos um desenvolvedor Full Stack com experiência em Nestjs e Vuejs.',
  })
  @IsString()
  @IsNotEmpty()
  public description: string

  @ApiProperty({
    description: 'Data de publicação da vaga (formato ISO 8601).',
    example: '2024-08-11T10:00:00Z',
  })
  @IsDateString()
  public publicationDate: string

  @ApiProperty({
    description: 'Data limite para candidatura (formato ISO 8601).',
    example: '2024-08-31T23:59:59Z',
  })
  @IsDateString()
  public applicationDeadline: string

  @ApiProperty({
    description: 'Horário de jornada da vaga.',
    example: 'full-time',
    enum: ['part-time', 'full-time'],
  })
  @IsIn(['part-time', 'full-time'])
  public workSchedule: 'part-time' | 'full-time'

  @ApiProperty({
    description: 'Modo de trabalho da vaga.',
    example: 'hybrid',
    enum: ['onsite', 'remote', 'hybrid'],
  })
  @IsIn(['onsite', 'remote', 'hybrid'])
  public workMode: 'onsite' | 'remote' | 'hybrid'

  @ApiProperty({
    description: 'Setor da empresa responsável pela vaga.',
    example: 'TI',
  })
  @IsString()
  @IsNotEmpty()
  public sector: string

  @ApiProperty({
    description: 'Nível de experiência requerido para a vaga.',
    example: 'senior',
    enum: ['junior', 'mid', 'senior', 'managerial'],
  })
  @IsIn(['junior', 'mid', 'senior', 'managerial'])
  public level: 'junior' | 'mid' | 'senior' | 'managerial'

  @ApiProperty({
    description: 'Informações de contato da vaga.',
    example: {
      email: 'la.ele@milvezes.com',
      phone: '+55 22 99999-9999',
    },
  })
  @IsObject()
  public contact: ContactType

  @ApiProperty({
    description: 'Lista de habilidades desejadas para a vaga.',
    example: ['Node.js', 'Vue', 'Nest', 'TDD'],
    type: [String],
  })
  @IsArray()
  public desiredSkills: string[]

  @ApiProperty({
    description: 'Nível de escolaridade requerido para a vaga.',
    example: 'Bacharelado em Sistemas de Informação',
  })
  @IsString()
  @IsNotEmpty()
  public education: string

  @ApiProperty({
    description: 'Experiência requerida para a vaga.',
    example: '2 anos de experiência em desenvolvimento web',
    required: false,
  })
  @IsOptional()
  @IsString()
  public experience?: string
}
