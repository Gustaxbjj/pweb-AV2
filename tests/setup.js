// setup.js
import * as models from '../models/Index.js';
import sequelize from '../config/database.js';

const db = { ...models };

before(async () => {
  try {
    await sequelize.sync({ force: true }); // recria as tabelas
  } catch (err) {
    console.error('❌ Erro ao sincronizar o banco:', err);
  }
});

afterEach(async () => {
  try {
    const modelList = Object.values(db);
    for (const model of modelList) {
      if (typeof model.destroy === 'function') {
        await model.destroy({ where: {}, force: true }); // limpa os dados sem truncar
      }
    }
  } catch (err) {
    console.error('❌ Erro ao limpar os dados do banco:', err);
  }
});

after(async () => {
  try {
    await sequelize.close();
  } catch (err) {
    console.error('❌ Erro ao fechar o banco:', err);
  }
});

export { sequelize, db };
