import { expect } from "chai";
import { sequelize, db } from "./setup.js";

describe('Usuario model', () => {

  it('deve conectar ao banco de dados', async () => {
    await sequelize.authenticate();
    expect(sequelize).to.have.property('config');
    expect(sequelize.config).to.have.property('database');
    expect(sequelize.config.database).to.be.a('string');
  });

  it('Deve criar um usuário com dados válidos', async () => {
    const usuario = await db.Usuario.create({
      nome_usuario: 'Talys Test',
      email: 'talys@gmail.com',
      senha: '12345',
      criado_em: new Date()
    });

    expect(usuario).to.have.property('id');
    expect(usuario.nome_usuario).to.equal('Talys Test');
    expect(usuario.email).to.equal('talys@gmail.com');
  
  });
});
