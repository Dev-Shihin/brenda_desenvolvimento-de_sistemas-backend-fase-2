import { Controller, Logger, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PLANO_REPOSITORY, IPlanoRepository } from '../../dominio/plano.repository.interface';

@Controller()
export class PlanoMessagingController {
  private readonly logger = new Logger(PlanoMessagingController.name);

  constructor(
    @Inject(PLANO_REPOSITORY)
    private readonly planoRepository: IPlanoRepository,
  ) {
    this.logger.log('PlanoMessagingController inicializado para gestao_queue');
  }

  @MessagePattern('get_plano_by_id')
  async handleGetPlanoById(@Payload() data: { id: number }): Promise<{ id: number; nome: string; valor: number } | null> {
    this.logger.log(`Recebida solicitação RPC para plano ${data.id} na fila gestao_queue`);
    try {
      const plano = await this.planoRepository.findById(data.id);
      if (!plano) {
        this.logger.error(`Plano ${data.id} não encontrado`);
        throw new Error(`Plano ${data.id} não encontrado`);
      }
      this.logger.log(`Plano ${data.id} encontrado: ${JSON.stringify(plano)}`);
      return {
        id: plano.getId(),
        nome: plano.getNome(),
        valor: plano.getValor(),
      };
    } catch (error) {
      this.logger.error(`Erro ao consultar plano ${data.id}: ${error.message}`, error.stack);
      throw error;
    }
  }
}