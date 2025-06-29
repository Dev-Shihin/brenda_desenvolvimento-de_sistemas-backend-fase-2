import { Controller, Post, Get, Param, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CriarClienteUseCase } from '../../aplicacao/use-cases/criar-cliente.use-case';
import { BuscarClienteUseCase } from '../../aplicacao/use-cases/buscar-cliente.use-case';
import { AtualizarClienteUseCase } from '../../aplicacao/use-cases/atualizar-cliente.use-case';
import { ListarClientesUseCase } from '../../aplicacao/use-cases/listar-clientes.use-case';
import { DeletarClienteUseCase } from '../../aplicacao/use-cases/deletar-cliente.use-case';
import { AssociarPlanoClienteUseCase } from '../../aplicacao/use-cases/associar-plano-cliente.use-case';
import { Cliente } from '../../dominio/cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly criarClienteUseCase: CriarClienteUseCase,
    private readonly buscarClienteUseCase: BuscarClienteUseCase,
    private readonly atualizarClienteUseCase: AtualizarClienteUseCase,
    private readonly listarClientesUseCase: ListarClientesUseCase,
    private readonly deletarClienteUseCase: DeletarClienteUseCase,
    private readonly associarPlanoClienteUseCase: AssociarPlanoClienteUseCase,
  ) {}

  @Post()
  async createCliente(@Body() clienteData: { id: number; nome: string; planoId: number }): Promise<void> {
    if (!clienteData.id || clienteData.id <= 0) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    if (!clienteData.nome || clienteData.nome.trim() === '') {
      throw new HttpException('Nome é obrigatório', HttpStatus.BAD_REQUEST);
    }
    if (!clienteData.planoId || clienteData.planoId <= 0) {
      throw new HttpException('PlanoId inválido', HttpStatus.BAD_REQUEST);
    }
    const cliente = new Cliente(clienteData.id, clienteData.nome, clienteData.planoId);
    await this.criarClienteUseCase.execute(cliente);
  }

  @Get(':id')
  async getCliente(@Param('id') id: string): Promise<Cliente | null> {
    const parsedId = Number(id);
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    return await this.buscarClienteUseCase.execute(parsedId);
  }

  @Put(':id')
  async updateCliente(@Param('id') id: string, @Body() clienteData: { nome: string; planoId: number }): Promise<void> {
    const parsedId = Number(id);
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    if (!clienteData.nome || clienteData.nome.trim() === '') {
      throw new HttpException('Nome é obrigatório', HttpStatus.BAD_REQUEST);
    }
    if (!clienteData.planoId || clienteData.planoId <= 0) {
      throw new HttpException('PlanoId inválido', HttpStatus.BAD_REQUEST);
    }
    const cliente = new Cliente(parsedId, clienteData.nome, clienteData.planoId);
    await this.atualizarClienteUseCase.execute(cliente);
  }

  @Get()
  async getAllClientes(): Promise<Cliente[]> {
    return await this.listarClientesUseCase.execute();
  }

  @Delete(':id')
  async deleteCliente(@Param('id') id: string): Promise<void> {
    const parsedId = Number(id);
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    await this.deletarClienteUseCase.execute(parsedId);
  }

  @Post(':id/planos')
  async associatePlano(@Param('id') id: string, @Body('planoId') planoId: number): Promise<void> {
    const parsedId = Number(id);
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    if (!planoId || planoId <= 0) {
      throw new HttpException('PlanoId inválido', HttpStatus.BAD_REQUEST);
    }
    await this.associarPlanoClienteUseCase.execute(parsedId, planoId);
  }
}