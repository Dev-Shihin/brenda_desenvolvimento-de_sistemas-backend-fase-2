import { Injectable } from '@nestjs/common';
import { PlanosAtivosService } from '../services/planos-ativos.service';
import { AtivarPlanoDto } from '../dto/ativar-plano.dto';

@Injectable()
export class AtivarPlanoUseCase {
  constructor(private planosAtivosService: PlanosAtivosService) {}

  async execute(data: AtivarPlanoDto) {
    try {
      const response = await this.planosAtivosService.ativarPlano(data);
      console.log('Plano ativado com sucesso:', response);
      return { success: true, data: response };
    } catch (error) {
      console.error('Erro ao ativar plano:', error.message);
      return { success: false, error: error.message };
    }
  }
}