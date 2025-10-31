import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import {
  CreateUserDto,
  GetUserDto,
  UpdateUserDto,
} from '../../infra/adapters/rest/dto/UserDto'
import { Response } from 'express'
import { UpdateUser } from 'src/domain/usecases/UpdateUser'
import { UpdateuserRestpresenter } from 'src/infra/adapters/rest/presenters/UpdateUserRestPresenter'
import { DatabaseUserAdapter } from 'src/infra/adapters/db/DatabaseUserAdapter'
import { UserService } from '../services/User.service'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly userPersister: DatabaseUserAdapter,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso!',
    type: GetUserDto,
  })
  async create(
    @Body() newUser: CreateUserDto,
    @Res() resp: Response<GetUserDto>,
  ): Promise<Response<GetUserDto>> {
    const createdUser = await this.userService.create({
      name: newUser.name,
      email: newUser.email,
    })

    return resp.send({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      age: null,
      city: null,
    })
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const presenter = new UpdateuserRestpresenter(res)
    const usecase = new UpdateUser(this.userPersister, presenter)

    await usecase.updateUser({
      id,
      ...dto,
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<any> {
    return this.userService.findAll()
  }
}
