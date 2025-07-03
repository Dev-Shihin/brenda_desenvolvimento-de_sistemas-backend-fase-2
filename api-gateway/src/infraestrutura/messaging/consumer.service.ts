import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';

@Injectable()
export class ConsumerService implements OnModuleInit {
  @Inject('RABBITMQ_SERVICE')
  private client: ClientProxy;

  constructor(private rabbitmqService: RabbitmqService) {}

  onModuleInit() {
    this.client.connect();
    console.log('ConsumerService conectado ao RabbitMQ e pronto para suporte');
  }

  async notify(event: string, data: any) {
    await this.rabbitmqService.emit(event, data);
  }
}