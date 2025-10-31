import { registerAs } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'

const databaseDataSource = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: Number(process.env.DATABASE_PORT),
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
  }
}
export default registerAs('typeorm', databaseDataSource)
export const connectionSource = new DataSource(
  databaseDataSource() as DataSourceOptions,
)
