import { expect } from 'chai';
import { sequelize, db } from './setup.js'; // ajusta o caminho se necessário

describe('Model Plataforma', () => {
  // Limpa a tabela plataformas antes de cada teste
  beforeEach(async () => {
    await db.Plataforma.destroy({ where: {}, force: true });
  });

  it('Deve conectar ao banco de dados', async () => {
    await sequelize.authenticate();
    expect(sequelize.config.database).to.be.a('string');
  });

  it('Deve criar uma plataforma com dados válidos', async () => {
    const plataforma = await db.Plataforma.create({
      nome: `Plataforma Teste ${Date.now()}`
    });

    expect(plataforma).to.have.property('id');
    expect(plataforma.nome).to.include('Plataforma Teste');
  });

  it('Deve permitir nome nulo', async () => {
    const plataforma = await db.Plataforma.create({
      nome: null
    });

    expect(plataforma).to.have.property('id');
    expect(plataforma.nome).to.be.null;
  });
});
