import { Module, ValidationPipe } from '@nestjs/common'
import { JobOpportunityController } from './application/controllers/JobOpportunity.controller'
import { JobOpportunityService } from './application/services/JobOpportiunity.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { Company } from './infra/entities/Company.entity'
import { CompanyService } from './application/services/Company.service'
import { CompanyController } from './application/controllers/Company.controller'
import { JobOpportiunity } from './infra/entities/JobOpportunity.entity'
import { Location } from './infra/entities/value_objects/Location.entity'
import { User } from './infra/entities/User.entity'
import { UserService } from './application/services/User.service'
import { UserController } from './application/controllers/User.controller'
import googleOauthConfig from './application/config/google-oauth.config'
import { GoogleStrategy } from './application/strategies/google.strategy'
import { AuthController } from './application/controllers/auth.controller'
import { AuthService } from './application/services/Auth.service'
import { JwtModule } from '@nestjs/jwt'
import jwtConfig from './application/config/jwt.config'
import { JwtStrategy } from './application/strategies/jwt.strategy'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
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
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
