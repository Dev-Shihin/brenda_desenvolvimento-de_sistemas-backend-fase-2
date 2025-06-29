import { Controller, Post, Get, Patch, Delete, Body, Param, HttpCode, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CriarCobrancaUseCase } from '../../aplicacao/use-cases/criar-cobranca.use-case';
import { BuscarCobrancaUseCase } from '../../aplicacao/use-cases/buscar-cobranca.use-case';
import { AtualizarCobrancaUseCase } from '../../aplicacao/use-cases/atualizar-cobranca.use-case';
import { DeletarCobrancaUseCase } from '../../aplicacao/use-cases/deletar-cobranca.use-case';
import { CreateCobrancaDto } from '../../aplicacao/dtos/cobranca.dto';
import { UpdateCobrancaDto } from '../../aplicacao/dtos/cobranca.dto';
import { Cobranca } from '../../dominio/entities/cobranca.entity';

@ApiTags('cobrancas')
@Controller('cobrancas')
export class CobrancaController {
  constructor(
    private readonly criarCobrancaUseCase: CriarCobrancaUseCase,
    private readonly buscarCobrancaUseCase: BuscarCobrancaUseCase,
    private readonly atualizarCobrancaUseCase: AtualizarCobrancaUseCase,
    private readonly deletarCobrancaUseCase: DeletarCobrancaUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova cobrança' })
  @ApiBody({ type: CreateCobrancaDto })
  @ApiResponse({ status: 201, description: 'Cobrança criada com sucesso', type: Cobranca })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() dto: CreateCobrancaDto): Promise<Cobranca> {
    return this.criarCobrancaUseCase.execute(dto);
  }

  @Get(':cobrancaId')
  @ApiOperation({ summary: 'Consultar cobrança por ID' })
  @ApiParam({ name: 'cobrancaId', description: 'ID da cobrança', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'Cobrança encontrada', type: Cobranca })
  @ApiResponse({ status: 404, description: 'Cobrança não encontrada' })
  async findById(@Param('cobrancaId') cobrancaId: string): Promise<Cobranca> {
    return this.buscarCobrancaUseCase.execute(cobrancaId);
  }

  @Get('cliente/:clienteId')
  @ApiOperation({ summary: 'Consultar cobranças por ID do cliente' })
  @ApiParam({ name: 'clienteId', description: 'ID do cliente', example: '100' })
  @ApiResponse({ status: 200, description: 'Lista de cobranças', type: [Cobranca] })
  async findByClienteId(@Param('clienteId', ParseIntPipe) clienteId: number): Promise<Cobranca[]> {
    return this.buscarCobrancaUseCase.executeByClienteId(clienteId);
  }

  @Patch(':cobrancaId')
  @ApiOperation({ summary: 'Atualizar uma cobrança' })
  @ApiParam({ name: 'cobrancaId', description: 'ID da cobrança', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiBody({ type: UpdateCobrancaDto })
  @ApiResponse({ status: 200, description: 'Cobrança atualizada', type: Cobranca })
  @ApiResponse({ status: 404, description: 'Cobrança não encontrada' })
  async update(
    @Param('cobrancaId') cobrancaId: string,
    @Body() dto: UpdateCobrancaDto,
  ): Promise<Cobranca> {
    return this.atualizarCobrancaUseCase.execute(cobrancaId, dto);
  }

  @Delete(':cobrancaId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deletar uma cobrança' })
  @ApiParam({ name: 'cobrancaId', description: 'ID da cobrança', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 204, description: 'Cobrança deletada' })
  @ApiResponse({ status: 404, description: 'Cobrança não encontrada' })
  async delete(@Param('cobrancaId') cobrancaId: string): Promise<void> {
    return this.deletarCobrancaUseCase.execute(cobrancaId);
  }
}