import {Usuario, Jogo, Pedido, Desenvolvedor, Categoria, Avaliacao, Jogo_Plataforma, PedidoItem, Plataforma } from './models/Index.js';
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';

import usuarioRouter from './routes/UsuarioRouters.js';
import categoriaRouter from './routes/CategoriaRouters.js';
import Jogosrouter from './routes/JogosRouters.js';
import plataformaRouter from './routes/PlataformaRouters.js';
import desenvolvedorRouter from './routes/DesenvolvedorRoutes.js';
import avaliacoesRouter from './routes/AvaliacoesRouters.js';
import pedidosRouter from './routes/PedidosRouters.js';
import pedidoItensRouter from './routes/Pedido_ItensRouters.js';
import jogosPlataformaRouter from './routes/Jogos_PlataformaRouters.js';


const app = express();
const port =process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/version', (req, res) =>{
 res.json({status: 'ok', version: '1.0.0'});
});

app.use('/usuarios', usuarioRouter);
app.use('/categorias', categoriaRouter);
app.use('/plataformas', plataformaRouter);
app.use('/jogos', Jogosrouter )
app.use('/desenvolvedores', desenvolvedorRouter);
app.use('/avaliacoes', avaliacoesRouter);
app.use('/pedidos', pedidosRouter);
app.use('/pedidoItens', pedidoItensRouter);
app.use('/jogosPlataformas', jogosPlataformaRouter);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tudo certo chefe ✅');
    app.listen(port, () => {
      console.log(`Server ok port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Deu ruim:', error);
  });