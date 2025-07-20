import express from 'express';
import { Desenvolvedor } from '../models/Index.js';
import { expect } from 'chai';

const DesenvolvedorRouter = express.Router();

//  Buscar todos os Desenvolvedores
DesenvolvedorRouter.get('/', async (_req, res) => {
  try {
    const desenvolvedor = await Desenvolvedor.findAll();
    res.json(desenvolvedor);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o desenvolvedor', details: err.message });
  }
});

// Buscar desenvolvedor por ID
DesenvolvedorRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const desenvolvedor = await Desenvolvedor.findByPk(id);

    if (desenvolvedor)
      res.json(desenvolvedor);
    else
      res.status(404).json({ error: 'Desenvolvedor não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar o desenvolvedor', details: err.message });
  }
});

//  Criar novo desenvolvedor
DesenvolvedorRouter.post('/', async (req, res) => {
  try {
    const desenvolvedor = Desenvolvedor.build(req.body);
    await desenvolvedor.validate();
    await desenvolvedor.save();

    res.status(201).json(desenvolvedor);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar a desenvolvedor', details: err.message });
  }
});

//  Atualizar desenvolvedor por ID
DesenvolvedorRouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Desenvolvedor.update(req.body, {
      where: { id },
    });

    if (updated) {
      const desenvolvedorAtualizada = await Desenvolvedor.findByPk(id);
      return res.json(desenvolvedorAtualizada);
    }

    return res.status(404).json({ error: 'Desenvolvedor não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar Desenvolvedor', details: err.message });
  }
});

//  Deletar categoria por ID
DesenvolvedorRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Desenvolvedor.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Passei o facão com sucesso! 🔪✅' });
    }

    return res.status(404).json({ error: 'Desenvolvedor não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar desenvolvedor', details: err.message });
  }
});

export default DesenvolvedorRouter;
