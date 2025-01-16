import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { UserService } from '../services/User.service'
import { v4 } from 'uuid'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from '../dto/UserDto'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso!',
    type: CreateUserDto,
  })
  create(@Body() newUser: CreateUserDto) {
    const id = v4()
    const createdCompany = this.userService.create({
      id,
      name: newUser.name,
      email: newUser.email,
    })
    return createdCompany
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<any> {
    return this.userService.findAll()
  }
}
