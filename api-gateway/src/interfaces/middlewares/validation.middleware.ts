import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const { body, path } = req;
    let dtoInstance;
    switch (path) {
      case '/clientes':
        dtoInstance = plainToClass(require('../aplicacao/dto/criar-cliente.dto').CriarClienteDto, body);
        break;
      case '/planos-ativos':
        dtoInstance = plainToClass(require('../aplicacao/dto/ativar-plano.dto').AtivarPlanoDto, body);
        break;
      case '/cobrancas':
        dtoInstance = plainToClass(require('../aplicacao/dto/criar-cobranca.dto').CriarCobrancaDto, body);
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