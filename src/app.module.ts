import { Module, ValidationPipe } from '@nestjs/common'
import { JobOpportunityController } from './application/controllers/JobOpportunity.controller'
import { JobOpportunityService } from './application/services/JobOpportiunity.service'
import { ConfigModule } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [JobOpportunityController],
  providers: [
    JobOpportunityService,
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
