import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Plataforma = sequelize.define('Plataforma', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'plataformas',
    timestamps: false
  });

  return Plataforma;
};
