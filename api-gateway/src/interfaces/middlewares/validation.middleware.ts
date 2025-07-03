import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CriarClienteDto } from '../../aplicacao/dto/criar-cliente.dto';
import { AtivarPlanoDto } from '../../aplicacao/dto/ativar-plano.dto';
import { CriarCobrancaDto } from '../../aplicacao/dto/criar-cobranca.dto';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const { body, path } = req;
    let dtoInstance;

    const cleanPath = path.replace(/^\/api/, '');

    switch (cleanPath) {
      case '/clientes':
        dtoInstance = plainToClass(CriarClienteDto, body);
        break;
      case '/planos-ativos':
        dtoInstance = plainToClass(AtivarPlanoDto, body);
        break;
      case '/cobrancas':
        dtoInstance = plainToClass(CriarCobrancaDto, body);
        break;
      default:
        return next();
    }

    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      const errorMessages = errors
        .map(error => {
          if (error.constraints) {
            return Object.values(error.constraints);
          }
          return [];
        })
        .flat();
      if (errorMessages.length > 0) {
        throw new BadRequestException(errorMessages);
      }
    }

    req.body = dtoInstance;
    next();
  }
}