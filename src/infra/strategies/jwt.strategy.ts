import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import jwtConfig from '../../infra/config/jwt.config'
import { AuthJwtPayload } from '../types/auth-jwtPayload'
import { Inject } from '@nestjs/common'
import { Request } from 'express'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req.cookies['auth']) return null
        return req.cookies['auth']
      },
      secretOrKey: jwtConfiguration.secret,
    })
  }

  validate(payload: AuthJwtPayload) {
    return { id: payload.sub }
  }
}
