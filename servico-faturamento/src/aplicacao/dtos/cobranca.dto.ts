import { IsNotEmpty, IsEnum, IsNumber, IsDateString } from 'class-validator';

export class CreateCobrancaDto {
  @IsNotEmpty()
  @IsNumber()
  cobrancaId: number;

  @IsNotEmpty()
  @IsNumber()
  clienteId: number;

  @IsNotEmpty()
  @IsNumber()
  planoId: number;

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