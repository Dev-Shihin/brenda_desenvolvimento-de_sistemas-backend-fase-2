import { ConfigService } from '@nestjs/config';

export const getGatewayConfig = (configService: ConfigService) => ({
  services: {
    gestao: configService.get<string>('GESTAO_URL') || 'http://localhost:3000',
    faturamento: configService.get<string>('FATURAMENTO_URL') || 'http://localhost:3001',
    planosAtivos: configService.get<string>('PLANOS_ATIVOS_URL') || 'http://localhost:3002',
  },
});