import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteController } from './cliente/cliente.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Rayssa.98',
      database: 'postgres',
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
