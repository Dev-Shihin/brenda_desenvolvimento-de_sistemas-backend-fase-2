import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { GerarRelatorioClientesUseCase } from '../../aplicacao/use-cases/gerar-relatorio-clientes.use-case';

@Controller('relatorios')
export class RelatorioController {
  constructor(private readonly gerarRelatorioClientesUseCase: GerarRelatorioClientesUseCase) {}

  @Get('clientes-por-status')
  async getClientesPorStatus(): Promise<{ [key: string]: number }> {
    try {
      const relatorio = await this.gerarRelatorioClientesUseCase.execute();
      if (Object.keys(relatorio).length === 0) {
        throw new HttpException('Nenhum cliente encontrado', HttpStatus.NOT_FOUND);
      }
      return relatorio;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}