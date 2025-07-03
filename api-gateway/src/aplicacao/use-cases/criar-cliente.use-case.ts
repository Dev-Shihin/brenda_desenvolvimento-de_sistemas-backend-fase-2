import { Injectable } from '@nestjs/common';
import { GestaoService } from '../services/gestao.service';
import { CriarClienteDto } from '../dto/criar-cliente.dto';

@Injectable()
export class CriarClienteUseCase {
  constructor(private gestaoService: GestaoService) {}

  async execute(data: CriarClienteDto) {
    try {
      const response = await this.gestaoService.criarCliente(data);
      console.log('Cliente criado:', response);
      return { success: true, data: response };
    } catch (error) {
      console.error('Erro ao criar cliente:', error.message);
      return { success: false, error: error.message };
    }
  }
}