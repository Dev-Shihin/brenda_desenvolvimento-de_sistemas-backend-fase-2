import { Controller, Post, Get, Param, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CriarClienteUseCase } from '../../aplicacao/use-cases/criar-cliente.use-case';
import { BuscarClienteUseCase } from '../../aplicacao/use-cases/buscar-cliente.use-case';
import { AtualizarClienteUseCase } from '../../aplicacao/use-cases/atualizar-cliente.use-case';
import { ListarClientesUseCase } from '../../aplicacao/use-cases/listar-clientes.use-case';
import { DeletarClienteUseCase } from '../../aplicacao/use-cases/deletar-cliente.use-case';
import { AssociarPlanoClienteUseCase } from '../../aplicacao/use-cases/associar-plano-cliente.use-case';
import { AtualizarStatusPlanoUseCase } from '../../aplicacao/use-cases/atualizar-status-plano.use-case';
import { CreateClienteDto, UpdateClienteDto } from '../../aplicacao/dtos/cliente.dto';
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
    private readonly atualizarStatusPlanoUseCase: AtualizarStatusPlanoUseCase,
  ) {}

  @Post()
  async createCliente(@Body() clienteData: CreateClienteDto): Promise<void> {
    const cliente = new Cliente(
      clienteData.id,
      clienteData.nome,
      clienteData.planoId,
      clienteData.statusPlano,
    );
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
  async updateCliente(@Param('id') id: string, @Body() clienteData: UpdateClienteDto): Promise<void> {
    const parsedId = Number(id);
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    const existingCliente = await this.buscarClienteUseCase.execute(parsedId);
    if (!existingCliente) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }
    const cliente = new Cliente(
      parsedId,
      clienteData.nome ?? existingCliente.getNome(),
      clienteData.planoId ?? existingCliente.getPlanoId(),
      clienteData.statusPlano ?? existingCliente.getStatusPlano(),
    );
    await this.atualizarClienteUseCase.update(cliente);
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

  @Put(':id/status-plano')
  async updateStatusPlano(@Param('id') id: string, @Body('statusPlano') statusPlano: string): Promise<void> {
    const parsedId = Number(id);
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    if (!['ativo', 'cancelado', 'suspenso'].includes(statusPlano)) {
      throw new HttpException('Status do plano inválido. Use: ativo, cancelado ou suspenso', HttpStatus.BAD_REQUEST);
    }
    await this.atualizarStatusPlanoUseCase.execute(parsedId, statusPlano);
  }
}