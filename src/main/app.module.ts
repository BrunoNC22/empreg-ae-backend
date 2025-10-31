import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { Company } from '../infra/entities/Company.entity'
import { JobOpportiunity } from '../infra/entities/JobOpportunity.entity'
import { Location } from '../infra/entities/value_objects/Location.entity'
import { User } from '../infra/entities/User.entity'
import googleOauthConfig from '../infra/config/google-oauth.config'
import { JwtModule } from '@nestjs/jwt'
import jwtConfig from '../infra/config/jwt.config'
import { DatabaseUserAdapter } from '../infra/adapters/db/DatabaseUserAdapter'
import { RestAuthenticationAdapter } from '../infra/adapters/auth/RestAuthenticationAdapter'
import typeorm from '../infra/config/DatabaseDataSource'
import { JobOpportunityController } from 'src/infra/controllers/JobOpportunity.controller'
import { CompanyController } from 'src/infra/controllers/Company.controller'
import { UserController } from 'src/infra/controllers/User.controller'
import { AuthController } from 'src/infra/controllers/auth.controller'
import { JobOpportunityService } from 'src/infra/services/JobOpportiunity.service'
import { CompanyService } from 'src/infra/services/Company.service'
import { UserService } from 'src/infra/services/User.service'
import { AuthService } from 'src/infra/services/Auth.service'
import { GoogleStrategy } from 'src/infra/strategies/google.strategy'
import { JwtStrategy } from 'src/infra/strategies/jwt.strategy'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm')!,
    }),
    TypeOrmModule.forFeature([Company, JobOpportiunity, Location, User]),
    ConfigModule.forFeature(googleOauthConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [
    JobOpportunityController,
    CompanyController,
    UserController,
    AuthController,
  ],
  providers: [
    JobOpportunityService,
    CompanyService,
    UserService,
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    DatabaseUserAdapter,
    RestAuthenticationAdapter,
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
