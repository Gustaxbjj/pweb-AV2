// setup.js
import * as models from '../models/Index.js';
import sequelize from '../config/database.js';

const db = { ...models };

before(async () => {
  try {
    await sequelize.sync({ force: true }); // recria as tabelas
  } catch (err) {
    console.error('Erro ao sincronizar o banco:', err);
  }
});
afterEach(async () => {
  try {
    await sequelize.truncate({ cascade: true, restartIdentity: true });
  } catch (err) {
    console.error('Erro ao truncar o banco:', err);
  }
});

after(async () => {
  try {
    await sequelize.close();
  } catch (err) {
    console.error('Erro ao fechar o banco:', err);
  }
});

export { sequelize, db };
