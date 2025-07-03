import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CriarClienteUseCase } from '../../aplicacao/use-cases/criar-cliente.use-case';
import { AtivarPlanoUseCase } from '../../aplicacao/use-cases/ativar-plano.use-case';
import { CriarCobrancaUseCase } from '../../aplicacao/use-cases/criar-cobranca.use-case';
import { CriarClienteDto } from '../../aplicacao/dto/criar-cliente.dto';
import { AtivarPlanoDto } from '../../aplicacao/dto/ativar-plano.dto';
import { CriarCobrancaDto } from '../../aplicacao/dto/criar-cobranca.dto';

@Controller()
export class GatewayController {
  constructor(
    private criarClienteUseCase: CriarClienteUseCase,
    private ativarPlanoUseCase: AtivarPlanoUseCase,
    private criarCobrancaUseCase: CriarCobrancaUseCase
  ) {}

  @Post('clientes')
  async criarCliente(@Body() data: CriarClienteDto) {
    return this.criarClienteUseCase.execute(data);
  }

  @Post('planos-ativos')
  async ativarPlano(@Body() data: AtivarPlanoDto) {
    return this.ativarPlanoUseCase.execute(data);
  }

  @Get('planos-ativos/:id')
  async getPlanoAtivo(@Param('id') id: string) {
    return { id, status: 'ativo' }; 
  }

  @Post('cobrancas')
  async criarCobranca(@Body() data: CriarCobrancaDto) {
    return this.criarCobrancaUseCase.execute(data);
  }
}