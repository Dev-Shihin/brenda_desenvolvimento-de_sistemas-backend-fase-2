import { IsNotEmpty, IsInt, IsString, IsDateString } from 'class-validator';

export class AtivarPlanoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsInt()
  @IsNotEmpty()
  clienteId: number;

  @IsInt()
  @IsNotEmpty()
  planoId: number;

  @IsString()
  @IsNotEmpty()
  nomePlano: string;

  @IsInt()
  @IsNotEmpty()
  valor: number;

  @IsDateString()
  @IsNotEmpty()
  dataAtivacao: string;

  @IsString()
  @IsNotEmpty()
  timestamp: string;
}