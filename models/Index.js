import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

//  Conexão com o banco
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  }
);

//  Importando das tabelas
import UsuarioModel from './Usuarios.js';
import CategoriaModel from './Categoria.js';
import DesenvolvedorModel from './Desenvolvedor.js';
import JogoModel from './Jogos.js';
import PlataformaModel from './Plataforma.js';
import JogoPlataformaModel from './Jogos_Plataforma.js';
import AvaliacaoModel from './Avaliacoes.js';
import PedidoModel from './Pedidos.js';
import PedidoItemModel from './Pedido_Itens.js';

// Inicialização das tabelas
const Usuario = UsuarioModel(sequelize);
const Categoria = CategoriaModel(sequelize);
const Desenvolvedor = DesenvolvedorModel(sequelize);
const Jogo = JogoModel(sequelize);
const Plataforma = PlataformaModel(sequelize);
const JogoPlataforma = JogoPlataformaModel(sequelize);
const Avaliacao = AvaliacaoModel(sequelize);
const Pedido = PedidoModel(sequelize);
const PedidoItem = PedidoItemModel(sequelize);

// Relacionamentos


Jogo.belongsTo(Categoria, { foreignKey: 'categoria_id' });
Categoria.hasMany(Jogo, { foreignKey: 'categoria_id' });

Jogo.belongsTo(Desenvolvedor, { foreignKey: 'desenvolvedor_id' });
Desenvolvedor.hasMany(Jogo, { foreignKey: 'desenvolvedor_id' });


Jogo.belongsToMany(Plataforma, {
  through: JogoPlataforma,
  foreignKey: 'jogo_id',
  otherKey: 'plataforma_id',
  timestamps: false
});
Plataforma.belongsToMany(Jogo, {
  through: JogoPlataforma,
  foreignKey: 'plataforma_id',
  otherKey: 'jogo_id',
  timestamps: false
});


Usuario.hasMany(Avaliacao, { foreignKey: 'usuario_id' });
Avaliacao.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Jogo.hasMany(Avaliacao, { foreignKey: 'jogo_id' });
Avaliacao.belongsTo(Jogo, { foreignKey: 'jogo_id' });


Usuario.hasMany(Pedido, { foreignKey: 'usuario_id' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id' });


Pedido.hasMany(PedidoItem, { foreignKey: 'pedido_id' });
PedidoItem.belongsTo(Pedido, { foreignKey: 'pedido_id' });

Jogo.hasMany(PedidoItem, { foreignKey: 'jogo_id' });
PedidoItem.belongsTo(Jogo, { foreignKey: 'jogo_id' });


export { sequelize, Usuario, Categoria,  Desenvolvedor,Jogo, Plataforma,JogoPlataforma,Avaliacao, Pedido,  PedidoItem};
