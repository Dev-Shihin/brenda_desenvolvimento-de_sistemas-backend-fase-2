import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CriarClienteDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  @IsNotEmpty()
  planoId: number;
}