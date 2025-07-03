import { IsNotEmpty, IsInt, IsString, IsDateString } from 'class-validator';

export class CriarCobrancaDto {
  @IsInt()
  @IsNotEmpty()
  cobrancaId: number;

  @IsInt()
  @IsNotEmpty()
  clienteId: number;

  @IsInt()
  @IsNotEmpty()
  valor: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDateString()
  @IsNotEmpty()
  dataVencimento: string;
}