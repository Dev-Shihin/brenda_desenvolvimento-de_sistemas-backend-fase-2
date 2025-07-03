export class Plano {
  private id: number;
  private nome: string;
  private valor: number;

  constructor(id: number, nome: string, valor: number) {
    if (id <= 0) throw new Error("ID deve ser maior que zero");
    if (!nome || nome.trim() === "") throw new Error("Nome é obrigatório");
    if (valor < 0) throw new Error("Valor não pode ser negativo");
    this.id = id;
    this.nome = nome;
    this.valor = valor;
  }

  getId(): number {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getValor(): number {
    return this.valor;
  }

  updateValor(valor: number): void {
    if (valor < 0) throw new Error("Valor não pode ser negativo");
    this.valor = valor;
  }
}