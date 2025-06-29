import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProxyService {
  constructor(private httpService: HttpService) {}

  async callGestao(endpoint: string, data?: any) {
    const url = `http://localhost:3000/${endpoint}`;
    const response = await firstValueFrom(
      this.httpService.post(url, data).pipe(
        map((response) => response.data), 
      ),
    );
    return response;
  }

  async callPlanosAtivos(endpoint: string, data?: any) {
    const url = `http://localhost:3002/${endpoint}`;
    const response = await firstValueFrom(
      this.httpService.post(url, data).pipe(
        map((response) => response.data),
      ),
    );
    return response;
  }

  async callFaturamento(endpoint: string, data?: any) {
    const url = `http://localhost:3001/${endpoint}`;
    const response = await firstValueFrom(
      this.httpService.post(url, data).pipe(
        map((response) => response.data),
      ),
    );
    return response;
  }
}