import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProcessarNotificacaoJob } from '../../aplicacao/jobs/processar-notificacao.job';

@Controller()
export class ConsumerController {
  constructor(private processarNotificacaoJob: ProcessarNotificacaoJob) {}

  @EventPattern('cliente_criado')
  async handleClienteCriado(@Payload() data: { clienteId: number; nome: string; planoId: number; timestamp: string }) {
    await this.processarNotificacaoJob.processarClienteCriado(data);
  }

  @EventPattern('plano_ativado')
  async handlePlanoAtivado(@Payload() data: { clienteId: number; planoId: number; nomePlano: string; valor: number; dataAtivacao: string; timestamp: string }) {
    await this.processarNotificacaoJob.processarPlanoAtivado(data);
  }

  @EventPattern('cobranca_criada')
  async handleCobrancaCriada(@Payload() data: { cobrancaId: number; clienteId: number; valor: number; status: string; dataVencimento: string; timestamp: string }) {
    await this.processarNotificacaoJob.processarCobrancaCriada(data);
  }
}