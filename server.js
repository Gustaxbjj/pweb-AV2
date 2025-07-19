import sequelize from "./config/database.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Está funcionando, pai!');
  } catch (error) {
    console.error('❌ Deu ruim, pai:', error); // mostra o erro real
  } finally {
    await sequelize.close(); // Fecha a conexão
    console.log('🔁 Conexão encerrada.');
  }
})();
