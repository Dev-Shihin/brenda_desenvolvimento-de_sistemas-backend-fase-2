import { Transport } from '@nestjs/microservices';

export const rabbitmqConfig = {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672'],
    queue: 'api_gateway_queue',
    queueOptions: {
      durable: true,
    },
    noAck: false,
  },
};