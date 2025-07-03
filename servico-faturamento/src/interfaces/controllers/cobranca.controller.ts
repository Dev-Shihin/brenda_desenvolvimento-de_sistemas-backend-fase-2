import { Controller, Post, Get, Patch, Delete, Body, Param, HttpCode, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { CriarCobrancaUseCase } from '../../aplicacao/use-cases/criar-cobranca.use-case';
import { BuscarCobrancaUseCase } from '../../aplicacao/use-cases/buscar-cobranca.use-case';
import { AtualizarCobrancaUseCase } from '../../aplicacao/use-cases/atualizar-cobranca.use-case';
import { DeletarCobrancaUseCase } from '../../aplicacao/use-cases/deletar-cobranca.use-case';
import { CreateCobrancaDto, UpdateCobrancaDto } from '../../aplicacao/dtos/cobranca.dto';
import { Cobranca } from '../../dominio/entities/cobranca.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('cobrancas')
export class CobrancaController {
  constructor(
    private readonly criarCobrancaUseCase: CriarCobrancaUseCase,
    private readonly buscarCobrancaUseCase: BuscarCobrancaUseCase,
    private readonly atualizarCobrancaUseCase: AtualizarCobrancaUseCase,
    private readonly deletarCobrancaUseCase: DeletarCobrancaUseCase,
    @InjectRepository(Cobranca)
    private readonly cobrancaRepository: Repository<Cobranca>,
  ) {}

  @Post()
  async create(@Body() dto: CreateCobrancaDto): Promise<Cobranca> {
    const existingCobranca = await this.cobrancaRepository.findOne({ where: { cobrancaId: dto.cobrancaId } });
    if (existingCobranca) {
      throw new BadRequestException(`Cobrança com cobrancaId ${dto.cobrancaId} já existe`);
    }
    return this.criarCobrancaUseCase.execute(dto);
  }

  @Get(':cobrancaId')
  async findById(@Param('cobrancaId') cobrancaId: string): Promise<Cobranca> {
    return this.buscarCobrancaUseCase.execute(cobrancaId);
  }

  @Get('cliente/:clienteId')
  async findByClienteId(@Param('clienteId', ParseIntPipe) clienteId: number): Promise<Cobranca[]> {
    return this.buscarCobrancaUseCase.executeByClienteId(clienteId);
  }

  @Patch(':cobrancaId')
  async update(
    @Param('cobrancaId') cobrancaId: string,
    @Body() dto: UpdateCobrancaDto,
  ): Promise<Cobranca> {
    return this.atualizarCobrancaUseCase.execute(cobrancaId, dto);
  }

  @Delete(':cobrancaId')
  @HttpCode(204)
  async delete(@Param('cobrancaId') cobrancaId: string): Promise<void> {
    return this.deletarCobrancaUseCase.execute(cobrancaId);
  }
}