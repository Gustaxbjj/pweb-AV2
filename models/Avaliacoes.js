import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Avaliacao = sequelize.define('Avaliacao', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jogo_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nota: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'avaliacoes',
    timestamps: false
  });

  return Avaliacao;
};
