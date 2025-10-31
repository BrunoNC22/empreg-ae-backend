import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import {
  CreateUserDto,
  GetUserDto,
} from '../../infra/adapters/rest/dto/UserDto'
import { Login } from 'src/domain/usecases/Login'
import { LoginRestPresenter } from 'src/infra/adapters/rest/presenters/LoginRestPresenter'
import { DatabaseUserAdapter } from 'src/infra/adapters/db/DatabaseUserAdapter'
import { RestAuthenticationAdapter } from 'src/infra/adapters/auth/RestAuthenticationAdapter'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from '../services/Auth.service'
import { UserService } from '../services/User.service'
import { GoogleAuthGuard } from '../guards/google-auth.guard'

type BitrixAuthQuery = {
  code: string
  state: string
  domain: string
  member_id: string
  scope: string
  server_domain: string
}

type BitrixCredentials = {
  access_token: string
  expires: number
  expires_in: number
  scope: string
  domain: 'oauth.bitrix.info'
  server_endpoint: 'https://oauth.bitrix.info/rest/'
  status: string
  client_endpoint: 'https://tdsustentavel.bitrix24.com.br/rest/'
  member_id: string
  user_id: number
  refresh_token: string
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject() private readonly authService: AuthService,
    @Inject() private readonly userService: UserService,
    @Inject() private readonly userPersister: DatabaseUserAdapter,
    @Inject() private readonly restAuthAdapter: RestAuthenticationAdapter,
    private jwtService: JwtService,
  ) {}

  @Post('logout')
  async logout(@Res() res: Response) {
    return res
      .cookie('auth', '', { httpOnly: true })
      .status(200)
      .send({ message: 'logged out' })
  }

  @Post('default/login')
  @ApiResponse({
    description: 'Login successfull',
    type: GetUserDto,
    status: 200,
  })
  async defaultLogin(@Body() user: CreateUserDto, @Res() res: Response) {
    const presenter = new LoginRestPresenter(res)
    const usecase = new Login(
      presenter,
      this.userPersister,
      this.restAuthAdapter,
    )
    await usecase.login(user.name, user.email)
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req: any, @Res() res: any) {
    const resp = this.authService.googleLogin(req)
    if (resp === 'No user from google') throw new Error('No user from google')
    const { user } = resp
    let foundUser = await this.userService.findByEmail(user.email)
    if (foundUser === null) {
      const userName = `${user.firstName} ${user.lastName}`
      foundUser = await this.userService.create({
        name: userName,
        email: user.email,
      })
    }
    const token = this.authService.login(foundUser.id)
    res.redirect(
      `http://localhost:5173/google-oauth-callback?token=${token}&username=${user.firstName}%20${user.lastName}&email=${user.email}&profilePictureURL=${user.picture}`,
    )
  }

  @Get('bitrix/credentials')
  async loginWithBitrix(@Query() query: BitrixAuthQuery) {
    console.log('query: ', query) // Exibe todos os query params no console

    const queryParameters = {
      grantType: 'grant_type=authorization_code',
      clientId: `client_id=local.678a812b9f0333.37402764`,
      clientSecret:
        'client_secret=KAtW67K2PDQ5pwaZSWJlLGqiSk9VauTefbYM7xYo7pfcDoq58P',
      code: `code=${query.code}`,
    }
    const response = await fetch(
      `https://${query.server_domain}/oauth/token/?${queryParameters.grantType}&${queryParameters.clientId}&${queryParameters.clientSecret}&${queryParameters.code}`,
    )

    if (response.status !== 200) {
      console.log('Erro ao fazer a requisição:', await response.json())
      throw new BadRequestException(
        'Erro ao fazer a requisição para o bitrix OAuth',
      )
    }
    const parsedResponse = <BitrixCredentials>await response.json()
    console.log('Sucesso ao autenticar: ', parsedResponse)
    const jwtToken = this.jwtService.sign({
      bitrixAccessToken: parsedResponse.access_token,
      bitrixRefreshToken: parsedResponse.refresh_token,
      bitrixUserId: parsedResponse.user_id,
      bitrixMemberId: parsedResponse.member_id,
    })

    console.log('Encoded JWT token: ', jwtToken)

    const decodedToken = this.jwtService.decode(jwtToken)

    console.log('Decoded JWT token: ', decodedToken)

    const currentUserfetch = await fetch(
      `${parsedResponse.client_endpoint}/user.current`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${parsedResponse.access_token}`,
        },
      },
    )
    if (currentUserfetch.status !== 200) {
      console.log(
        'Erro ao obter as informações do usuário atual',
        await currentUserfetch.json(),
      )
      throw new InternalServerErrorException(
        `Erro ao obter as informações do usuário atual. Status ${currentUserfetch.status}`,
      )
    }

    const currentUserData = await currentUserfetch.json()
    console.log('Current user data: ', currentUserData)
    return `current user data: ${JSON.stringify(currentUserData, null, 2)}`
  }
}
