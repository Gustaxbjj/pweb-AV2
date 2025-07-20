import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
       defaultValue: 'Nome Padrão'
    }
  }, {
    tableName: 'usuarios',
    timestamps: false
  });

  return Usuario;
};
