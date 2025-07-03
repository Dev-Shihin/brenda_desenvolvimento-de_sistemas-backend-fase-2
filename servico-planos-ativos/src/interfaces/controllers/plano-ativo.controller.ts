import { Controller, Get, Param } from '@nestjs/common';
import { ConsultarPlanoAtivoUseCase } from 'src/aplicacao/use-cases/consultar-plano-ativo.use-case';

@Controller('planos-ativos')
export class PlanoAtivoController {
  constructor(private readonly consultarPlanoAtivoUseCase: ConsultarPlanoAtivoUseCase) {}

  @Get(':clienteId')
  async findByClienteId(@Param('clienteId') clienteId: number) {
    return this.consultarPlanoAtivoUseCase.execute(clienteId);
  }
}