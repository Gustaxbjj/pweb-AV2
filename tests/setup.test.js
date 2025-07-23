import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Configurações de Test', () => {
  // Limpa a tabela de usuários antes de cada teste
  beforeEach(async () => {
    await db.Usuario.destroy({
      where: {},
      truncate: false,
      restartIdentity: true,
    });
  });

  it('Deve conectar ao banco', async () => {
    await sequelize.authenticate();
    expect(sequelize.config.database).to.equal('Jogos-api-test');
  });

  it('Deve criar um usuário no banco PostgreSQL', async () => {
  try {
    const usuario = await db.Usuario.create({
      nome_usuario: `Talys_${Date.now()}`,
      email: `talys_${Date.now()}@gmail.com`,
      senha: '1234',
      criado_em: new Date()
    });

    expect(usuario).to.have.property('id');
    expect(usuario.nome_usuario).to.include('Talys_');
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', JSON.stringify(error, null, 2));
    throw error;
  }
});

});
