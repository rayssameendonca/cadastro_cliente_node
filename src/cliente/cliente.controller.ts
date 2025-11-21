import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { Sequelize } from 'sequelize-typescript';

class Cliente {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  telefone: string;
}

class ClienteUpdate {
  @ApiProperty()
  email: string;

  @ApiProperty()
  telefone: string;
}

@ApiBearerAuth()
@Controller('cliente')
export class ClienteController {
  constructor(private readonly connection: Sequelize) {}

  // (/) Listar todos
  @Get('/')
  async listarTodos() {
    const [results] = await this.connection.query(
      `SELECT * FROM nodejs.cliente`,
      { raw: true },
    );

    return results;
  }

  // (/:id) Listar por id
  @Get(':id')
  async obterPorId(@Param('id') id: string) {
    const [results] = await this.connection.query(
      `SELECT * FROM nodejs.cliente WHERE id = ${id}`,
    );

    return results;
  }

  // (/) Criar novo cliente
  @Post('/')
  async criar(@Body() data: Cliente) {
    const sql = `
      INSERT INTO nodejs.cliente (nome, email, telefone)
      VALUES ('${data.nome}', '${data.email}', '${data.telefone}')
      RETURNING *;
    `;

    const [results] = await this.connection.query(sql);
    return results;
  }

  // (/:id) Atualizar clienter (email e telefone)
  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() data: ClienteUpdate) {
    const sql = `
      UPDATE nodejs.cliente
      SET email = '${data.email}',
          telefone = '${data.telefone}'
      WHERE id = ${id}
      RETURNING *;
    `;

    const [results] = await this.connection.query(sql);
    return results;
  }

  // (/:id) Excluir
  @Delete(':id')
  async excluir(@Param('id') id: string) {
    const sql = `
      DELETE FROM nodejs.cliente
      WHERE id = ${id}
      RETURNING *;
    `;

    const [results] = await this.connection.query(sql);

    return {
      mensagem: 'Cliente removido com sucesso!',
      cliente: results,
    };
  }
}
