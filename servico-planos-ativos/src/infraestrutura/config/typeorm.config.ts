import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeormConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const mongodbUri = configService.get<string>('MONGODB_URI');
    if (!mongodbUri) {
      throw new Error('MONGODB_URI não está definido no arquivo .env');
    }
    return {
      type: 'mongodb',
      url: mongodbUri,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // Use apenas em desenvolvimento
      useUnifiedTopology: true,
    };
  },
  inject: [ConfigService],
};