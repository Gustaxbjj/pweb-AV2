import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const JogoPlataforma = sequelize.define('JogoPlataforma', {
    jogo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    plataforma_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    tableName: 'jogo_plataformas',
    timestamps: false
  });

  return JogoPlataforma;
};
