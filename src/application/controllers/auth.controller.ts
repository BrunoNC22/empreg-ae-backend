import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common'
import { GoogleAuthGuard } from '../guards/google-auth.guard'
import { AuthService } from '../services/Auth.service'
import { UserService } from '../services/User.service'
import { User } from 'src/domain/entities/User'

@Controller('auth')
export class AuthController {
  constructor(
    @Inject() private readonly authService: AuthService,
    @Inject() private readonly userService: UserService,
  ) {}

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
      const newUser = new User(userName, user.email)
      foundUser = await this.userService.create({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      })
    }
    const token = this.authService.login(foundUser.id)
    res.redirect(
      `http://localhost:5173/google-oauth-callback?token=${token}&username=${user.firstName}%20${user.lastName}&email=${user.email}&profilePictureURL=${user.picture}`,
    )
  }
}
