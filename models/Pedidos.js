import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Pedido = sequelize.define('Pedido', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data_pedido: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendente'
    }
  }, {
    tableName: 'pedidos',
    timestamps: false
  });

  return Pedido;
};
