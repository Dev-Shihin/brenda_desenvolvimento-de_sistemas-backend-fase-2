import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ProxyService } from '../../infraestrutura/http/proxy.service';
import { CriarClienteUseCase } from '../../aplicacao/use-cases/criar-cliente.use-case';
import { AtivarPlanoUseCase } from '../../aplicacao/use-cases/ativar-plano.use-case';
import { CriarCobrancaUseCase } from '../../aplicacao/use-cases/criar-cobranca.use-case';
import { AuthGuard } from '../guards/auth.guard';
import { ApiResponseData } from '../decorators/api-response.decorator';
import { CriarClienteDto } from '../../aplicacao/dto/criar-cliente.dto';
import { AtivarPlanoDto } from '../../aplicacao/dto/ativar-plano.dto';
import { CriarCobrancaDto } from '../../aplicacao/dto/criar-cobranca.dto';

@Controller()
@UseGuards(AuthGuard) // Aplica o guard globalmente ao controller
export class GatewayController {
  constructor(
    private proxyService: ProxyService,
    private criarClienteUseCase: CriarClienteUseCase,
    private ativarPlanoUseCase: AtivarPlanoUseCase,
    private criarCobrancaUseCase: CriarCobrancaUseCase,
  ) {}

  @Post('clientes')
  @ApiResponseData(CriarClienteDto)
  async criarCliente(@Body() data: CriarClienteDto) {
    return this.criarClienteUseCase.execute(data);
  }

  @Post('planos-ativos')
  @ApiResponseData(AtivarPlanoDto)
  async ativarPlano(@Body() data: AtivarPlanoDto) {
    return this.ativarPlanoUseCase.execute(data);
  }

  @Get('clientes/:id')
  @ApiResponseData(CriarClienteDto)
  async getCliente(@Param('id') id: string) {
    return this.proxyService.callGestao(`clientes/${id}`);
  }

  @Post('cobrancas')
  @ApiResponseData(CriarCobrancaDto)
  async criarCobranca(@Body() data: CriarCobrancaDto) {
    return this.criarCobrancaUseCase.execute(data);
  }
}