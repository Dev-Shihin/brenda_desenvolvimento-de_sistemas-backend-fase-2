import { Injectable } from '@nestjs/common';
import { FaturamentoService } from '../services/faturamento.service';
import { CriarCobrancaDto } from '../dto/criar-cobranca.dto';

@Injectable()
export class CriarCobrancaUseCase {
  constructor(private faturamentoService: FaturamentoService) {}

  async execute(data: CriarCobrancaDto) {
    try {
      const response = await this.faturamentoService.criarCobranca(data);
      console.log('Cobrança criada com sucesso:', response);
      return { success: true, data: response };
    } catch (error) {
      console.error('Erro ao criar cobrança:', error.message);
      return { success: false, error: error.message };
    }
  }
}