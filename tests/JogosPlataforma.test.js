import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Model JogoPlataforma', () => {
  let jogo, plataforma, categoria, desenvolvedor;

  beforeEach(async () => {
    await Promise.all([
      db.JogoPlataforma.destroy({ where: {}, force: true }),
      db.Jogo.destroy({ where: {}, force: true }),
      db.Plataforma.destroy({ where: {}, force: true }),
      db.Categoria.destroy({ where: {}, force: true }),
      db.Desenvolvedor.destroy({ where: {}, force: true }),
    ]);

    categoria = await db.Categoria.create({ nome: 'Categoria JP' });
    desenvolvedor = await db.Desenvolvedor.create({ nome: 'Dev JP' });
    jogo = await db.Jogo.create({
      nome: 'Jogo JP',
      categoria_id: categoria.id,
      desenvolvedor_id: desenvolvedor.id,
      preco: 30,
    });
    plataforma = await db.Plataforma.create({ nome: 'Plataforma Teste' });
  });

  it('Deve criar um JogoPlataforma válido', async () => {
    const jp = await db.JogoPlataforma.create({
      jogo_id: jogo.id,
      plataforma_id: plataforma.id,
    });

    expect(jp.jogo_id).to.equal(jogo.id);
    expect(jp.plataforma_id).to.equal(plataforma.id);
  });
});
