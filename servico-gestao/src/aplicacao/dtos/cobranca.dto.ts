import { IsNumber, IsString, IsDateString, IsEnum } from 'class-validator';

export class CreateCobrancaDto {
  @IsNumber()
  cobrancaId: number;

  @IsNumber()
  clienteId: number;

  @IsNumber()
  valor: number;

  @IsEnum(['pendente', 'pago', 'cancelado'])
  status: string;

  @IsDateString()
  dataVencimento: string;
}