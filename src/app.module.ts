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
    TypeOrmModule.forFeature([Company, JobOpportiunity]),
  ],
  controllers: [JobOpportunityController, CompanyController],
  providers: [
    JobOpportunityService,
    CompanyService,
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
