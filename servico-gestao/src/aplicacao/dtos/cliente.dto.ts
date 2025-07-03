import { IsNumber, IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @IsNumber({}, { message: 'ID deve ser um número' })
  id: number;

  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsNumber({}, { message: 'PlanoId deve ser um número' })
  planoId: number;

  @IsEnum(['ativo', 'cancelado', 'suspenso'], {
    message: 'Status do plano deve ser ativo, cancelado ou suspenso',
  })
  statusPlano: string;
}

export class UpdateClienteDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome?: string;

  @IsNumber({}, { message: 'PlanoId deve ser um número' })
  planoId?: number;

  @IsEnum(['ativo', 'cancelado', 'suspenso'], {
    message: 'Status do plano deve ser ativo, cancelado ou suspenso',
  })
  statusPlano?: string;
}