export class Cobranca {
  private id: string;
  private cobrancaId: string;
  private clienteId: number;
  private valor: number;
  private status: string;
  private dataVencimento: Date;

  constructor(
    id: string,
    cobrancaId: string,
    clienteId: number,
    valor: number,
    status: string,
    dataVencimento: Date
  ) {
    this.id = id;
    this.cobrancaId = cobrancaId;
    this.clienteId = clienteId;
    this.valor = valor;
    this.status = status;
    this.dataVencimento = dataVencimento;
  }

  // Getters
  getId(): string { return this.id; }
  getCobrancaId(): string { return this.cobrancaId; }
  getClienteId(): number { return this.clienteId; }
  getValor(): number { return this.valor; }
  getStatus(): string { return this.status; }
  getDataVencimento(): Date { return this.dataVencimento; }

  // Setters (se necessário)
  setStatus(status: string): void { this.status = status; }
}