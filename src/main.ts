import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
  })
  const app_port = configService.get<string>('APP_PORT')
  await app.listen(app_port ? app_port : 3000)
}
bootstrap()
