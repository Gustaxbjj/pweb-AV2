import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Model Desenvolvedor', () => {
  beforeEach(async () => {
    await db.Desenvolvedor.destroy({ where: {}, force: true });
  });

  it('Deve conectar ao banco', async () => {
    await sequelize.authenticate();
    expect(sequelize.config.database).to.be.a('string');
  });

  it('Deve criar um desenvolvedor válido', async () => {
    const dev = await db.Desenvolvedor.create({
      nome: 'Dev Teste',
    });

    expect(dev).to.have.property('id');
    expect(dev.nome).to.equal('Dev Teste');
  });

  it('Deve permitir nome nulo', async () => {
    const dev = await db.Desenvolvedor.create({
      nome: null,
    });

    expect(dev.nome).to.be.null;
  });
});
