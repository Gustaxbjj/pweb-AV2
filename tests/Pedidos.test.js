import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Model Pedido', () => {
  let usuario;

  beforeEach(async () => {
    await Promise.all([
      db.Pedido.destroy({ where: {}, force: true }),
      db.Usuario.destroy({ where: {}, force: true }),
    ]);

    usuario = await db.Usuario.create({
      nome_usuario: 'UsuarioPedido',
      email: `pedido${Date.now()}@test.com`,
      senha: '1234',
    });
  });

  it('Deve criar um pedido com dados válidos', async () => {
    const pedido = await db.Pedido.create({
      usuario_id: usuario.id,
    });

    expect(pedido).to.have.property('id');
    expect(pedido.usuario_id).to.equal(usuario.id);
    expect(pedido.status).to.equal('pendente');
  });

  it('Deve permitir alterar o status do pedido', async () => {
    const pedido = await db.Pedido.create({
      usuario_id: usuario.id,
      status: 'finalizado',
    });

    expect(pedido.status).to.equal('finalizado');
  });
});
