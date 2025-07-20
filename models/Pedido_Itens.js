import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const PedidoItem = sequelize.define('PedidoItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jogo_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    tableName: 'pedido_itens',
    timestamps: false
  });

  return PedidoItem;
};
