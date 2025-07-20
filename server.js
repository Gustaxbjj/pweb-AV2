import { sequelize, Usuario, Jogo, Pedido, Desenvolvedor, Categoria, Avaliacao, JogoPlataforma, PedidoItem, Plataforma } from './models/Index.js';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({ alter: true }); // Sincroniza os modelos com o banco
    console.log('✅ Tabelas sincronizadas com sucesso.');

    // Exemplo de uso:
    const novoUsuario = await Usuario.create({
      nome: 'Talys Gustavo',
      email: 'talys@email.com',
      senha: 'senha123'
    });

    const usuarios = await Usuario.findAll();
    console.log(`Total de usuários: ${usuarios.length}`);
  } catch (error) {
    console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', error);
  } finally {
    await sequelize.close();
  }
})();
