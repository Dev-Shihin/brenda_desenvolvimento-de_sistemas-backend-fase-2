import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProcessarNotificacaoJob } from '../../aplicacao/jobs/processar-notificacao.job';

@Controller()
export class ConsumerController {
  constructor(private processarNotificacaoJob: ProcessarNotificacaoJob) {}

  @EventPattern('plano.ativado')
  async handlePlanoAtivado(@Payload() data: { id: string; clienteId: number; planoId: number; nomePlano: string; valor: number; dataAtivacao: string; timestamp: string }) {
    console.log(`Processando plano ativado: ${JSON.stringify(data)}`);
    await this.processarNotificacaoJob.processarPlanoAtivado(data);
  }

  @EventPattern('plano.desativado')
  async handlePlanoDesativado(@Payload() data: { id: string; clienteId: number; planoId: number; timestamp: string }) {
    console.log(`Processando plano desativado: ${JSON.stringify(data)}`);
  }

  @EventPattern('cobranca.created')
  async handleCobrancaCriada(@Payload() data: { cobrancaId: number; clienteId: number; valor: number; status: string; dataVencimento: string; timestamp: string }) {
    console.log(`Processando cobrança criada: ${JSON.stringify(data)}`);
    await this.processarNotificacaoJob.processarCobrancaCriada(data);
  }
}