import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteEntity } from '../../dominio/cliente.entity.typeorm';

@Injectable()
export class GestaoMensageriaService {
  constructor(
    @Inject('GESTAO_SERVICE') private client: ClientProxy,
    @InjectRepository(ClienteEntity) private clienteRepository: Repository<ClienteEntity>,
  ) {}
}
