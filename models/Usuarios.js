import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nome_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'usuarios',
    timestamps: false, 
  });

  return Usuario;
};
