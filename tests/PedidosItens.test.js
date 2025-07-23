import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Model PedidoItem', () => {
  let pedido, jogo, categoria, desenvolvedor;

  beforeEach(async () => {
    await Promise.all([
      db.PedidoItem.destroy({ where: {}, force: true }),
      db.Pedido.destroy({ where: {}, force: true }),
      db.Jogo.destroy({ where: {}, force: true }),
      db.Categoria.destroy({ where: {}, force: true }),
      db.Desenvolvedor.destroy({ where: {}, force: true }),
      db.Usuario.destroy({ where: {}, force: true }),
    ]);

    // FK passo a passo
    const usuario = await db.Usuario.create({
      nome_usuario: 'UsuarioPedidoItem',
      email: `pedidoitem${Date.now()}@test.com`,
      senha: '1234',
    });
    categoria = await db.Categoria.create({ nome: 'Categoria PI' });
    desenvolvedor = await db.Desenvolvedor.create({ nome: 'Dev PI' });
    jogo = await db.Jogo.create({
      nome: 'Jogo PedidoItem',
      categoria_id: categoria.id,
      desenvolvedor_id: desenvolvedor.id,
      preco: 100,
    });
    pedido = await db.Pedido.create({
      usuario_id: usuario.id,
    });
  });

  it('Deve criar um item de pedido válido', async () => {
    const pedidoItem = await db.PedidoItem.create({
      pedido_id: pedido.id,
      jogo_id: jogo.id,
      quantidade: 2,
    });

    expect(pedidoItem).to.have.property('id');
    expect(pedidoItem.quantidade).to.equal(2);
  });

  it('Deve usar quantidade padrão 1', async () => {
    const pedidoItem = await db.PedidoItem.create({
      pedido_id: pedido.id,
      jogo_id: jogo.id,
    });

    expect(pedidoItem.quantidade).to.equal(1);
  });
});
