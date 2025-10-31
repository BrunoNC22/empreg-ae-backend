import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthenticationOutputPort } from 'src/domain/ports/output/auth/AuthenticationOutputPort'
import { AuthJwtPayload } from 'src/infra/types/auth-jwtPayload'

@Injectable()
export class RestAuthenticationAdapter implements AuthenticationOutputPort {
  constructor(private readonly jwtService: JwtService) {}

  generateJwtFromUserId(userId: string): string {
    const payload: AuthJwtPayload = {
      sub: userId,
    }
    return this.jwtService.sign(payload)
  }
}
