import express from 'express';
import { Categoria } from '../models/Index.js';
import { expect } from 'chai';

const Categoriarouter = express.Router();

//  Buscar todas as categorias
Categoriarouter.get('/', async (_req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar categorias', details: err.message });
  }
});

// Buscar categoria por ID
Categoriarouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (categoria)
      res.json(categoria);
    else
      res.status(404).json({ error: 'Categoria não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar categoria', details: err.message });
  }
});

//  Criar nova categoria
Categoriarouter.post('/', async (req, res) => {
  try {
    const categoria = Categoria.build(req.body);
    await categoria.validate();
    await categoria.save();

    res.status(201).json(categoria);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar a categoria', details: err.message });
  }
});


Categoriarouter.post('/batch', async (req, res) => {
  try {
    const result = await Categoria.bulkCreate(req.body);
    //console.log('oioi');
    // await usuario.validate();
    //await usuario.save();

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o usuário', details: err.message, errorFull: err });
  }
});


//  Atualizar categoria por ID
Categoriarouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Categoria.update(req.body, {
      where: { id },
    });

    if (updated) {
      const categoriaAtualizada = await Categoria.findByPk(id);
      return res.json(categoriaAtualizada);
    }

    return res.status(404).json({ error: 'Categoria não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar categoria', details: err.message });
  }
});

//  Deletar categoria por ID
Categoriarouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Categoria.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Passei o facão com sucesso! 🔪✅' });
    }

    return res.status(404).json({ error: 'Categoria não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar categoria', details: err.message });
  }
});

export default Categoriarouter;
