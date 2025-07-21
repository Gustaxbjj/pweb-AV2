import express from 'express';
import { Pedido } from '../models/Index.js';

const Pedidosrouter = express.Router();

// Buscar todos os usuários
Pedidosrouter.get('/', async (_req, res) => {
  try {
    const pedido = await Pedido.findAll();
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pedido', details: err.message });
  }
});

//  Buscar usuário por ID
Pedidosrouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByPk(id);

    if (pedido)
      res.json(pedido);
    else
      res.status(404).json({ error: 'Nenhum pedido encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar pedido', details: err.message });
  }
});

// Criar novo usuário
Pedidosrouter.post('/', async (req, res) => {
  try {
    const pedido = Pedido.build(req.body);
    await pedido.validate();
    await pedido.save();

    res.status(201).json(pedido);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o pedido', details: err.message });
  }
});

Pedidosrouter.post('/batch', async (req, res) => {
  try {
    const result = await Pedido.bulkCreate(req.body);
    //console.log('oioi');
    // await usuario.validate();
    //await usuario.save();

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o usuário', details: err.message, errorFull: err });
  }
});


//  Atualizar usuário por ID
Pedidosrouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Pedido.update(req.body, {
      where: { id },
    });

    if (updated) {
      const PedidoAtualizado = await Pedido.findByPk(id);
      return res.json(PedidoAtualizado);
    }

    return res.status(404).json({ error: 'Pedido não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar Pedido', details: err.message });
  }
});

// Deletar usuário por ID
Pedidosrouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Pedido.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Passei o facão com sucesso! 🔪✅' });
    }

    return res.status(404).json({ error: 'Pedido não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar Pedido', details: err.message });
  }
});

export default Pedidosrouter;
