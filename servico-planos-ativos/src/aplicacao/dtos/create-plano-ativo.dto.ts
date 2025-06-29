import { IsNotEmpty, IsInt, IsBoolean, IsString, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CriarPlanoAtivoDto {
  @IsInt()
  @IsNotEmpty()
  clienteId: number;

  @IsInt()
  @IsNotEmpty()
  planoId: number;

  @IsString()
  @IsNotEmpty()
  nomePlano: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsBoolean()
  @IsNotEmpty()
  ativo: boolean;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dataAtivacao: Date;
}