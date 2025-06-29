export class Cliente {
  private id: number;
  private nome: string;
  private planoId: number;

  constructor(id: number, nome: string, planoId: number) {
    if (id <= 0) throw new Error("ID deve ser maior que zero");
    if (!nome || nome.trim() === "") throw new Error("Nome é obrigatório");
    if (planoId <= 0) throw new Error("PlanoId deve ser maior que zero");
    this.id = id;
    this.nome = nome;
    this.planoId = planoId;
  }

  getId(): number {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getPlanoId(): number {
    return this.planoId;
  }

  setPlanoId(planoId: number): void {
    if (planoId <= 0) throw new Error("PlanoId deve ser maior que zero");
    this.planoId = planoId;
  }
}