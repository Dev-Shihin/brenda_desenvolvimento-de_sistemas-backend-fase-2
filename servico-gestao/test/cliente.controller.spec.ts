import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ClienteModule } from '../src/cliente.module';

describe('ClienteController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ClienteModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/clientes (POST) deve criar um cliente', async () => {
    await request(app.getHttpServer())
      .post('/clientes')
      .send({ id: 1, nome: 'João Silva', planoId: 1 })
      .expect(201);
  });

  it('/clientes/1 (GET) deve buscar um cliente', async () => {
    await request(app.getHttpServer())
      .post('/clientes')
      .send({ id: 1, nome: 'João Silva', planoId: 1 })
      .expect(201);

    return request(app.getHttpServer())
      .get('/clientes/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          id: 1,
          nome: 'João Silva',
          planoId: 1,
        });
      });
  });

  it('/clientes/1 (PUT) deve atualizar um cliente', async () => {
    await request(app.getHttpServer())
      .post('/clientes')
      .send({ id: 1, nome: 'João Silva', planoId: 1 })
      .expect(201);

    return request(app.getHttpServer())
      .put('/clientes/1')
      .send({ nome: 'João Silva Atualizado', planoId: 2 })
      .expect(200)
      .expect((res) => {
        return request(app.getHttpServer())
          .get('/clientes/1')
          .expect(200)
          .expect((res) => {
            expect(res.body).toMatchObject({
              id: 1,
              nome: 'João Silva Atualizado',
              planoId: 2,
            });
          });
      });
  });

  it('/clientes (GET) deve listar todos os clientes', async () => {
    await request(app.getHttpServer())
      .post('/clientes')
      .send({ id: 1, nome: 'João Silva', planoId: 1 })
      .expect(201);

    return request(app.getHttpServer())
      .get('/clientes')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
        expect(res.body[0]).toMatchObject({
          id: 1,
          nome: 'João Silva',
          planoId: 1,
        });
      });
  });

  it('/clientes/1 (DELETE) deve deletar um cliente', async () => {
    await request(app.getHttpServer())
      .post('/clientes')
      .send({ id: 1, nome: 'João Silva', planoId: 1 })
      .expect(201);

    return request(app.getHttpServer())
      .delete('/clientes/1')
      .expect(200)
      .expect(() => {
        return request(app.getHttpServer())
          .get('/clientes/1')
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeNull();
          });
      });
  });

  it('/clientes/1/planos (POST) deve associar um plano a um cliente', async () => {
    await request(app.getHttpServer())
      .post('/clientes')
      .send({ id: 1, nome: 'João Silva', planoId: 1 })
      .expect(201);

    return request(app.getHttpServer())
      .post('/clientes/1/planos')
      .send({ planoId: 2 })
      .expect(200)
      .expect((res) => {
        return request(app.getHttpServer())
          .get('/clientes/1')
          .expect(200)
          .expect((res) => {
            expect(res.body.planoId).toBe(2);
          });
      });
  });
});