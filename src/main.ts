import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
  })
  const app_port = configService.get<string>('APP_PORT')

  const swaggerConfig = new DocumentBuilder()
    .setTitle('EmpregAÊ api')
    .setDescription('Documentação da api do EmpregAÊ!')
    .setVersion('0.1')
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('documentation', app, swaggerDocument)

  await app.listen(app_port ? app_port : 3000)
}
bootstrap()
