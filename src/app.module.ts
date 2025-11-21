import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { ClienteController } from './cliente/cliente.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      username: process.env.DB_USER as string,
      password: process.env.DB_PASS as string,
      host: process.env.DB_HOST as string,
      database: process.env.DB_NAME as string,
      port: Number(process.env.DB_PORT),
      define: {
        schema: 'nodejs',
      },
      models: [],
    }),
  ],
  controllers: [AppController, ClienteController],
  providers: [AppService],
})
export class AppModule {}
