import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Model Jogo', () => {
  let categoria, desenvolvedor;

  beforeEach(async () => {
    await Promise.all([
      db.Jogo.destroy({ where: {}, force: true }),
      db.Categoria.destroy({ where: {}, force: true }),
      db.Desenvolvedor.destroy({ where: {}, force: true }),
    ]);

    categoria = await db.Categoria.create({ nome: 'Categoria Jogo' });
    desenvolvedor = await db.Desenvolvedor.create({ nome: 'Dev Jogo' });
  });

  it('Deve criar um jogo válido', async () => {
    const jogo = await db.Jogo.create({
      nome: 'Jogo Teste',
      categoria_id: categoria.id,
      desenvolvedor_id: desenvolvedor.id,
      preco: 99.9,
    });

    expect(jogo).to.have.property('id');
    expect(jogo.nome).to.equal('Jogo Teste');
    expect(jogo.preco).to.equal(99.9);
  });

  it('Deve permitir nome nulo', async () => {
    const jogo = await db.Jogo.create({
      nome: null,
      categoria_id: categoria.id,
      desenvolvedor_id: desenvolvedor.id,
      preco: 50,
    });

    expect(jogo.nome).to.be.null;
  });
});
