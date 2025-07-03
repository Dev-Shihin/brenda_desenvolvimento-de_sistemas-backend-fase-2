import { Controller, Post, Get, Param, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CriarPlanoUseCase } from '../../aplicacao/use-cases/criar-plano.use-case';
import { BuscarPlanoUseCase } from '../../aplicacao/use-cases/buscar-plano.use-case';
import { ListarPlanosUseCase } from '../../aplicacao/use-cases/listar-planos.use-case';
import { DeletarPlanoUseCase } from '../../aplicacao/use-cases/deletar-plano.use-case';
import { AtualizarPlanoUseCase } from '../../aplicacao/use-cases/atualizar-plano.use-case'; 
import { Plano } from '../../dominio/plano.entity';

@Controller('planos')
export class PlanoController {
  constructor(
    private readonly criarPlanoUseCase: CriarPlanoUseCase,
    private readonly buscarPlanoUseCase: BuscarPlanoUseCase,
    private readonly listarPlanosUseCase: ListarPlanosUseCase,
    private readonly deletarPlanoUseCase: DeletarPlanoUseCase,
    private readonly atualizarPlanoUseCase: AtualizarPlanoUseCase, 
  ) {}

  @Post()
  async createPlano(@Body() planoData: { id: number; nome: string; valor: number }): Promise<void> {
    if (!planoData.id || planoData.id <= 0) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    if (!planoData.nome || planoData.nome.trim() === '') {
      throw new HttpException('Nome é obrigatório', HttpStatus.BAD_REQUEST);
    }
    if (planoData.valor < 0) {
      throw new HttpException('Valor não pode ser negativo', HttpStatus.BAD_REQUEST);
    }
    const plano = new Plano(planoData.id, planoData.nome, planoData.valor);
    await this.criarPlanoUseCase.execute(plano);
  }

  @Get(':id')
  async getPlano(@Param('id') id: string): Promise<Plano | null> {
    const parsedId = Number(id);
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    return await this.buscarPlanoUseCase.execute(parsedId);
  }

  @Get()
  async getAllPlanos(): Promise<Plano[]> {
    return await this.listarPlanosUseCase.execute();
  }

  @Delete(':id')
  async deletePlano(@Param('id') id: string): Promise<void> {
    const parsedId = Number(id);
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    await this.deletarPlanoUseCase.execute(parsedId);
  }

  @Put(':id')
  async updatePlano(@Param('id') id: string, @Body() planoData: { nome: string; valor: number }): Promise<void> {
    const parsedId = Number(id);
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    if (!planoData.nome || planoData.nome.trim() === '') {
      throw new HttpException('Nome é obrigatório', HttpStatus.BAD_REQUEST);
    }
    if (planoData.valor < 0) {
      throw new HttpException('Valor não pode ser negativo', HttpStatus.BAD_REQUEST);
    }
    const plano = new Plano(parsedId, planoData.nome, planoData.valor);
    await this.atualizarPlanoUseCase.execute(plano);
  }
}