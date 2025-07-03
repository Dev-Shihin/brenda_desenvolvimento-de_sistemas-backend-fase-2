import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { getGatewayConfig } from '../config/gateway.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProxyService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private getServiceUrl(service: string): string {
    const config = getGatewayConfig(this.configService);
    return config.services[service as keyof typeof config.services];
  }

  async request(method: string, service: string, endpoint: string, data?: any) {
    const url = `${this.getServiceUrl(service)}/${endpoint}`;
    const response = await firstValueFrom(
      this.httpService.request({ method, url, data }).pipe(
        map((response) => response.data),
      ),
    );
    return response;
  }

  async callGestao(method: string, endpoint: string, data?: any) {
    return this.request(method, 'gestao', endpoint, data);
  }

  async callPlanosAtivos(method: string, endpoint: string, data?: any) {
    return this.request(method, 'planosAtivos', endpoint, data);
  }

  async callFaturamento(method: string, endpoint: string, data?: any) {
    return this.request(method, 'faturamento', endpoint, data);
  }
}