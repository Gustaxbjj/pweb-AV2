import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Desenvolvedor = sequelize.define('Desenvolvedor', {
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
    tableName: 'desenvolvedores',
    timestamps: false
  });

  return Desenvolvedor;
};
