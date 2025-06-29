import { IsNotEmpty, IsEnum, IsNumber, IsDateString } from 'class-validator';

export class CreateCobrancaDto {
  @IsNotEmpty()
  cobrancaId: number;

  @IsNotEmpty()
  clienteId: number;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsNotEmpty()
  @IsEnum(['pendente', 'pago', 'cancelado'])
  status: string;

  @IsNotEmpty()
  @IsDateString()
  dataVencimento: string;
}

export class UpdateCobrancaDto {
  @IsNumber()
  valor?: number;

  @IsEnum(['pendente', 'pago', 'cancelado'])
  status?: string;

  @IsDateString()
  dataVencimento?: string;
}