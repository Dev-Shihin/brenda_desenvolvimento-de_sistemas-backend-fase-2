import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { rabbitmqConfig } from '../config/rabbitmq.config';

@Injectable()
export class RabbitmqService implements OnModuleInit {
  @Inject('RABBITMQ_SERVICE')
  private client: ClientProxy;

  onModuleInit() {
    this.client.connect();
  }

  async emit(event: string, data: any) {
    return this.client.emit(event, data);
  }

  async send(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise();
  }
}