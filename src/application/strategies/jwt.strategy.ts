import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import jwtConfig from '../config/jwt.config'
import { AuthJwtPayload } from '../types/auth-jwtPayload'
import { Inject } from '@nestjs/common'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret,
    })
  }

  validate(payload: AuthJwtPayload) {
    return { id: payload.sub }
  }
}
