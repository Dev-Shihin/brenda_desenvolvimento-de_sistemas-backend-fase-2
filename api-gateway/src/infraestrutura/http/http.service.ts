import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HttpServiceCustom {
  constructor(@Inject(HttpService) private httpService: HttpService) {}

  async get(endpoint: string, serviceUrl: string) {
    const response = this.httpService.get(`${serviceUrl}/${endpoint}`);
    return lastValueFrom(response);
  }

  async post(endpoint: string, serviceUrl: string, data: any) {
    const response = this.httpService.post(`${serviceUrl}/${endpoint}`, data);
    return lastValueFrom(response);
  }
}