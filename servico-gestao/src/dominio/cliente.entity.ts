export class Cliente {
  private id: number;
  private nome: string;
  private planoId: number;
  private statusPlano: string; 

  constructor(id: number, nome: string, planoId: number, statusPlano: string = 'ativo') {
    if (id <= 0) throw new Error('ID deve ser maior que zero');
    if (!nome || nome.trim() === '') throw new Error('Nome é obrigatório');
    if (planoId <= 0) throw new Error('PlanoId deve ser maior que zero');
    if (!['ativo', 'cancelado', 'suspenso'].includes(statusPlano)) {
      throw new Error('Status do plano inválido. Use: ativo, cancelado ou suspenso');
    }
    this.id = id;
    this.nome = nome;
    this.planoId = planoId;
    this.statusPlano = statusPlano;
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

  getStatusPlano(): string {
    return this.statusPlano;
  }

  setPlanoId(planoId: number): void {
    if (planoId <= 0) throw new Error('PlanoId deve ser maior que zero');
    this.planoId = planoId;
  }

  setStatusPlano(statusPlano: string): void {
    if (!['ativo', 'cancelado', 'suspenso'].includes(statusPlano)) {
      throw new Error('Status do plano inválido. Use: ativo, cancelado ou suspenso');
    }
    this.statusPlano = statusPlano;
  }
}