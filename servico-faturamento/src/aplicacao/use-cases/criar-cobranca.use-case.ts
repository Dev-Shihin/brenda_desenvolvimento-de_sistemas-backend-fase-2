import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ICobrancaRepository } from 'src/dominio/interfaces/cobranca.repository.interface';
import { CreateCobrancaDto } from '../dtos/cobranca.dto';
import { Cobranca } from 'src/dominio/entities/cobranca.entity';
import { GestaoMensageriaService } from 'src/infraestrutura/messaging/gestao.mensageria.service';

export const COBRANCA_REPOSITORY = 'COBRANCA_REPOSITORY';

@Injectable()
export class CriarCobrancaUseCase {
  constructor(
    @Inject(COBRANCA_REPOSITORY) private readonly cobrancaRepository: ICobrancaRepository,
    private readonly gestaoMensageriaService: GestaoMensageriaService,
  ) {}

  async execute(dto: CreateCobrancaDto): Promise<Cobranca> {
    const cobranca = new Cobranca();
    cobranca.cobrancaId = dto.cobrancaId;
    cobranca.clienteId = dto.clienteId;
    cobranca.valor = dto.valor;
    cobranca.status = dto.status;
    cobranca.dataVencimento = new Date(dto.dataVencimento);

    console.log('Dados da cobrança antes de salvar:', JSON.stringify(cobranca, null, 2));

    const savedCobranca = await this.cobrancaRepository.create(cobranca);
    await this.gestaoMensageriaService.notifyCobrancaCreated({
      id: savedCobranca.id,
      cobrancaId: savedCobranca.cobrancaId,
      clienteId: savedCobranca.clienteId,
      status: savedCobranca.status,
    });
    return savedCobranca;
  }
}