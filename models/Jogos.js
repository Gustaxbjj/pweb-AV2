import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Jogo = sequelize.define('Jogo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: true
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    desenvolvedor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'jogos',
    timestamps: false
  });

  return Jogo;
};
