import express from 'express';
import { PedidoItem } from '../models/Index.js';
import { expect } from 'chai';

const Pedido_ItensRouters = express.Router();

//  Buscar todos os Desenvolvedores
Pedido_ItensRouters.get('/', async (_req, res) => {
  try {
    const pedidoItem = await pedidoItem.findAll();
    res.json(pedidoItem);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o item no pedido', details: err.message });
  }
});

// Buscar desenvolvedor por ID
Pedido_ItensRouters.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoItem = await pedidoItem.findByPk(id);

    if (pedidoItem)
      res.json(pedidoItem);
    else
      res.status(404).json({ error: 'item no pedido não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar o item no pedido', details: err.message });
  }
});

//  Criar novo desenvolvedor
Pedido_ItensRouters.post('/', async (req, res) => {
  try {
    const  pedidoItem = pedidoItem.build(req.body);
    await pedidoItem.validate();
    await pedidoItem.save();

    res.status(201).json(pedidoItem);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o item no pedido', details: err.message });
  }
});

Pedido_ItensRouters.post('/batch', async (req, res) => {
  try {
    const result = await PedidoItem.bulkCreate(req.body);
    //console.log('oioi');
    // await usuario.validate();
    //await usuario.save();

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o usuário', details: err.message, errorFull: err });
  }
});


//  Atualizar desenvolvedor por ID
Pedido_ItensRouters.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await PedidoItem.update(req.body, {
      where: { id },
    });

    if (updated) {
      const pedidoItemAtualizada = await PedidoItem.findByPk(id);
      return res.json(JogoAtualizada);
    }

    return res.status(404).json({ error: 'pedidoItem não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar Item pedido', details: err.message });
  }
});

//  Deletar categoria por ID
Pedido_ItensRouters.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await PedidoItem.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Passei o facão com sucesso! 🔪✅' });
    }

    return res.status(404).json({ error: 'item não encontrada no pedido' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar o item do pedido', details: err.message });
  }
});

export default Pedido_ItensRouters;
