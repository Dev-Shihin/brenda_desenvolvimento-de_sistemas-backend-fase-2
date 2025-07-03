import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CobrancaModule } from './cobranca.module';
import { Cobranca } from './dominio/entities/cobranca.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongodbUri = configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/servico_faturamento';
        const logger = new Logger('TypeOrmConfig');
        logger.log(`Configurando MongoDB com URI: ${mongodbUri}`);
        return {
          type: 'mongodb',
          url: mongodbUri,
          entities: [Cobranca],
          synchronize: true, // Usar apenas em desenvolvimento
          logging: true, // Habilitar logs para depuração
        };
      },
      inject: [ConfigService],
    }),
    CobrancaModule,
  ],
  controllers: [],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);
  constructor() {
    this.logger.log('AppModule inicializado');
  }
}