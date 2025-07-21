 import { expect } from 'chai';
    import { sequelize, db } from './setup.js';

    describe('Configurações de Test', () => {
      it('Deve conectar ao banco', async () => {
        await sequelize.authenticate();
        expect(sequelize.config.database).to.equal('Jogos-api-test');
      });

      it('Deve criar um usuário no banco PostgreSQL', async () => {
        const usuario = await db.Usuario.create({
          nome: 'gustavo',
          email: 'gtalys',
          senha:'1234',
          
        });

        expect(usuario).to.have.property('id');
        expect(usuario.nome).to.equal('gustavo');
      });
    });