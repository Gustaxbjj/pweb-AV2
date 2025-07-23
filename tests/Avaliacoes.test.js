import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Model Avaliacao', () => {
  let usuario, jogo, categoria, desenvolvedor;

  beforeEach(async () => {
    // Limpa tabelas (ordem importante)
    await Promise.all([
      db.Avaliacao.destroy({ where: {}, force: true }),
      db.Usuario.destroy({ where: {}, force: true }),
      db.Jogo.destroy({ where: {}, force: true }),
      db.Categoria.destroy({ where: {}, force: true }),
      db.Desenvolvedor.destroy({ where: {}, force: true }),
    ]);

    // Criação das FKs
    categoria = await db.Categoria.create({ nome: 'Categoria Teste' });
    desenvolvedor = await db.Desenvolvedor.create({ nome: 'Dev Teste' });
    usuario = await db.Usuario.create({
      nome_usuario: 'UsuarioAvaliacao',
      email: `avaliacao${Date.now()}@test.com`,
      senha: '1234',
    });
    jogo = await db.Jogo.create({
      nome: 'Jogo Avaliacao',
      categoria_id: categoria.id,
      desenvolvedor_id: desenvolvedor.id,
      preco: 60,
    });
  });

  it('Deve criar uma avaliação válida', async () => {
    const avaliacao = await db.Avaliacao.create({
      usuario_id: usuario.id,
      jogo_id: jogo.id,
      nota: 5,
      comentario: 'Top demais!',
    });

    expect(avaliacao).to.have.property('id');
    expect(avaliacao.nota).to.equal(5);
    expect(avaliacao.comentario).to.equal('Top demais!');
  });

  it('Deve permitir comentário nulo', async () => {
    const avaliacao = await db.Avaliacao.create({
      usuario_id: usuario.id,
      jogo_id: jogo.id,
      nota: 3,
      comentario: null,
    });

    expect(avaliacao.comentario).to.be.null;
  });
});
