import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ICobrancaRepository } from '../../dominio/interfaces/cobranca.repository.interface';
import { CreateCobrancaDto } from '../dtos/cobranca.dto';
import { Cobranca } from '../../dominio/entities/cobranca.entity';
import { GestaoMensageriaService } from '../../infraestrutura/messaging/gestao.mensageria.service';

export const COBRANCA_REPOSITORY = 'COBRANCA_REPOSITORY';

@Injectable()
export class CriarCobrancaUseCase {
  constructor(
    @Inject(COBRANCA_REPOSITORY) private readonly cobrancaRepository: ICobrancaRepository,
    private readonly gestaoMensageriaService: GestaoMensageriaService,
  ) {}

  async execute(dto: CreateCobrancaDto): Promise<Cobranca> {
   
    let plano;
    try {
      plano = await this.gestaoMensageriaService.getPlanoById(dto.planoId);
      console.log(`Plano ${dto.planoId} encontrado: ${JSON.stringify(plano)}`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    const cobranca = new Cobranca();
    cobranca.cobrancaId = dto.cobrancaId;
    cobranca.clienteId = dto.clienteId;
    cobranca.valor = plano.valor;
    cobranca.status = dto.status;
    cobranca.dataVencimento = new Date(dto.dataVencimento);

    console.log('Dados da cobrança antes de salvar:', JSON.stringify(cobranca, null, 2));

    const savedCobranca = await this.cobrancaRepository.create(cobranca);
    await this.gestaoMensageriaService.notifyCobrancaCreated({
      id: savedCobranca.id,
      cobrancaId: savedCobranca.cobrancaId,
      clienteId: savedCobranca.clienteId,
      valor: savedCobranca.valor,
      status: savedCobranca.status,
      dataVencimento: savedCobranca.dataVencimento,
    });
    return savedCobranca;
  }
}