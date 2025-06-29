import { Test, TestingModule } from '@nestjs/testing';
import { PlanoAtivoService } from 'src/application/services/plano-ativo.service';
import { IPlanoAtivoRepository } from 'src/dominio/interfaces/plano-ativo.repository.interface';
import { GestaoHttpService } from 'src/infrastructure/http/gestao-http.service';

describe('PlanoAtivoService', () => {
  let service: PlanoAtivoService;
  let repository: IPlanoAtivoRepository;
  let gestaoHttpService: GestaoHttpService;

  const mockRepository = {
    create: jest.fn(),
    findByClienteId: jest.fn(),
  };

  const mockGestaoHttpService = {
    getPlanoById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanoAtivoService,
        { provide: 'IPlanoAtivoRepository', useValue: mockRepository },
        { provide: GestaoHttpService, useValue: mockGestaoHttpService },
      ],
    }).compile();

    service = module.get<PlanoAtivoService>(PlanoAtivoService);
    repository = module.get<IPlanoAtivoRepository>('IPlanoAtivoRepository');
    gestaoHttpService = module.get<GestaoHttpService>(GestaoHttpService);
  });

  it('should create a plano ativo', async () => {
    const dto = {
      clienteId: 100,
      planoId: 1,
      nomePlano: 'Plano Básico',
      valor: 99.90,
      dataAtivacao: '2025-06-19',
      ativo: true,
    };
    const planoResponse = { id: 1, nome: 'Plano Básico', valor: 99.90 };
    const planoAtivo = {
      clienteId: dto.clienteId,
      planoId: dto.planoId,
      nomePlano: planoResponse.nome,
      valor: planoResponse.valor,
      dataAtivacao: new Date(dto.dataAtivacao),
      ativo: dto.ativo,
    };
    mockGestaoHttpService.getPlanoById.mockResolvedValue(planoResponse);
    mockRepository.create.mockResolvedValue(planoAtivo);

    const result = await service.createPlanoAtivo(dto);
    expect(result).toEqual(planoAtivo);
    expect(gestaoHttpService.getPlanoById).toHaveBeenCalledWith(dto.planoId);
    expect(repository.create).toHaveBeenCalledWith(planoAtivo);
  });

  it('should find planos ativos by clienteId', async () => {
    const planos = [
      {
        clienteId: 100,
        planoId: 1,
        nomePlano: 'Plano Básico',
        valor: 99.90,
        dataAtivacao: new Date('2025-06-19'),
        ativo: true,
      },
    ];
    mockRepository.findByClienteId.mockResolvedValue(planos);

    const result = await service.findPlanosAtivosByClienteId(100);
    expect(result).toEqual(planos);
    expect(repository.findByClienteId).toHaveBeenCalledWith(100);
  });
});