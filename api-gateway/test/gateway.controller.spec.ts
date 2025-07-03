import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from 'src/interface/controllers/gateway.controller';
import { GestaoHttpService } from 'src/application/services/gestao-http.service';
import { FaturamentoHttpService } from 'src/application/services/faturamento-http.service';
import { PlanosAtivosHttpService } from 'src/application/services/planos-ativos-http.service';

describe('GatewayController', () => {
  let controller: GatewayController;
  let gestaoService: GestaoHttpService;
  let faturamentoService: FaturamentoHttpService;
  let planosAtivosService: PlanosAtivosHttpService;

  const mockGestaoService = {
    createPlano: jest.fn(),
    getPlanoById: jest.fn(),
    deletePlano: jest.fn(),
  };

  const mockFaturamentoService = {
    createCobranca: jest.fn(),
  };

  const mockPlanosAtivosService = {
    createPlanoAtivo: jest.fn(),
    getPlanosAtivosByClienteId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [
        { provide: GestaoHttpService, useValue: mockGestaoService },
        { provide: FaturamentoHttpService, useValue: mockFaturamentoService },
        { provide: PlanosAtivosHttpService, useValue: mockPlanosAtivosService },
      ],
    }).compile();

    controller = module.get<GatewayController>(GatewayController);
    gestaoService = module.get<GestaoHttpService>(GestaoHttpService);
    faturamentoService = module.get<FaturamentoHttpService>(FaturamentoHttpService);
    planosAtivosService = module.get<PlanosAtivosHttpService>(PlanosAtivosHttpService);
  });

  it('should create a plano', async () => {
    const data = { id: 1, nome: 'Plano Básico', valor: 99.90 };
    mockGestaoService.createPlano.mockResolvedValue(data);

    const result = await controller.createPlano(data);
    expect(result).toEqual(data);
    expect(gestaoService.createPlano).toHaveBeenCalledWith(data);
  });

  it('should get a plano by id', async () => {
    const data = { id: 1, nome: 'Plano Básico', valor: 99.90 };
    mockGestaoService.getPlanoById.mockResolvedValue(data);

    const result = await controller.getPlanoById(1);
    expect(result).toEqual(data);
    expect(gestaoService.getPlanoById).toHaveBeenCalledWith(1);
  });

  it('should create a cobranca', async () => {
    const data = { cobrancaId: 1, clienteId: 100, valor: 99.90, status: 'pendente', dataVencimento: '2025-12-31' };
    mockFaturamentoService.createCobranca.mockResolvedValue(data);

    const result = await controller.createCobranca(data);
    expect(result).toEqual(data);
    expect(faturamentoService.createCobranca).toHaveBeenCalledWith(data);
  });

  it('should create a plano ativo', async () => {
    const data = { clienteId: 100, planoId: 1, nomePlano: 'Plano Básico', valor: 99.90, dataAtivacao: '2025-06-19', ativo: true };
    mockPlanosAtivosService.createPlanoAtivo.mockResolvedValue(data);

    const result = await controller.createPlanoAtivo(data);
    expect(result).toEqual(data);
    expect(planosAtivosService.createPlanoAtivo).toHaveBeenCalledWith(data);
  });

  it('should get planos ativos by clienteId', async () => {
    const data = [{ clienteId: 100, planoId: 1, nomePlano: 'Plano Básico', valor: 99.90, dataAtivacao: '2025-06-19', ativo: true }];
    mockPlanosAtivosService.getPlanosAtivosByClienteId.mockResolvedValue(data);

    const result = await controller.getPlanosAtivosByClienteId(100);
    expect(result).toEqual(data);
    expect(planosAtivosService.getPlanosAtivosByClienteId).toHaveBeenCalledWith(100);
  });
});