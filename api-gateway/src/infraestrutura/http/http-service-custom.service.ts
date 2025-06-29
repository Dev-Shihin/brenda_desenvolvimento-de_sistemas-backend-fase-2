import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpServiceCustom {
  constructor(private httpService: HttpService) {}

  async request(method: string, url: string, data?: any) {
    const response = await firstValueFrom(
      this.httpService.request({ method, url, data }).pipe(
        map((response) => response.data), 
      ),
    );
    return response;
  }
}