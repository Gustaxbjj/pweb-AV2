import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Model Categoria', () => {
  beforeEach(async () => {
    await db.Categoria.destroy({ where: {}, force: true });
  });

  it('Deve conectar ao banco', async () => {
    await sequelize.authenticate();
    expect(sequelize.config.database).to.be.a('string');
  });

  it('Deve criar uma categoria válida', async () => {
    const categoria = await db.Categoria.create({
      nome: 'Categoria Teste',
    });

    expect(categoria).to.have.property('id');
    expect(categoria.nome).to.equal('Categoria Teste');
  });

  it('Deve permitir nome nulo', async () => {
    const categoria = await db.Categoria.create({
      nome: null,
    });

    expect(categoria.nome).to.be.null;
  });
});
