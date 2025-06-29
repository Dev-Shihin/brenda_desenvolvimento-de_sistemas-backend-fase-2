import { Controller, Get, Post, Param, Body, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarPlanoAtivoUseCase } from 'src/aplicacao/use-cases/criar-plano-ativo.use-case';
import { ConsultarPlanoAtivoUseCase } from 'src/aplicacao/use-cases/consultar-plano-ativo.use-case';
import { DesativarPlanoAtivoUseCase } from 'src/aplicacao/use-cases/desativar-plano-ativo.use-case';
import { CriarPlanoAtivoDto } from '../../aplicacao/dtos/create-plano-ativo.dto';

@Controller('planos-ativos')
export class PlanoAtivoController {
  constructor(
    private readonly criarPlanoAtivoUseCase: CriarPlanoAtivoUseCase,
    private readonly consultarPlanoAtivoUseCase: ConsultarPlanoAtivoUseCase,
    private readonly desativarPlanoAtivoUseCase: DesativarPlanoAtivoUseCase,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(@Body() createPlanoAtivoDto: CriarPlanoAtivoDto) {
    return this.criarPlanoAtivoUseCase.execute(createPlanoAtivoDto);
  }

  @Get(':clienteId')
  async findByClienteId(@Param('clienteId') clienteId: number) {
    return this.consultarPlanoAtivoUseCase.execute(clienteId);
  }

  @Delete(':id')
  async deactivate(@Param('id') id: string) {
    await this.desativarPlanoAtivoUseCase.execute(id);
    return { message: 'Plano desativado com sucesso' };
  }
}