import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthJwtPayload } from '../types/auth-jwtPayload'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(userId: string) {
    const payload: AuthJwtPayload = {
      sub: userId,
    }
    return this.jwtService.sign(payload)
  }

  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user,
    }
  }
}
