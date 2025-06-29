import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteEntity } from '../../dominio/cliente.entity.typeorm';

@Controller()
export class CobrancaMessagingController {
  constructor(
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
  ) {}

  @EventPattern('cobranca.created')
  async handleCobrancaCreated(@Payload() data: any) {
    console.log('Cobrança criada recebida:', data);
    const cliente = await this.clienteRepository.findOneBy({ id: data.clienteId });
    if (cliente) {
      cliente.status = 'ativo';
      await this.clienteRepository.save(cliente);
      console.log(`Cliente ${data.clienteId} marcado como ativo`);
    }
  }

  @EventPattern('cobranca.updated')
  async handleCobrancaUpdated(@Payload() data: any) {
    console.log('Cobrança atualizada recebida:', data);
    const cliente = await this.clienteRepository.findOneBy({ id: data.clienteId });
    if (cliente && data.status === 'pago') {
      cliente.ultimaCobranca = new Date();
      await this.clienteRepository.save(cliente);
      console.log(`Última cobrança de ${data.clienteId} atualizada`);
    }
  }

  @EventPattern('cobranca.deleted')
  async handleCobrancaDeleted(@Payload() data: any) {
    console.log('Cobrança deletada recebida:', data);
    const cliente = await this.clienteRepository.findOneBy({ id: data.clienteId });
    if (cliente) {
      cliente.status = 'inativo';
      await this.clienteRepository.save(cliente);
      console.log(`Cliente ${data.clienteId} marcado como inativo`);
    }
  }
}
