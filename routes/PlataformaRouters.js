import express from 'express';
import { Plataforma } from '../models/Index.js';

const PlataformaRouter = express.Router();

// Buscar todos os usuários
PlataformaRouter.get('/', async (_req, res) => {
  try {
    const plataforma = await Plataforma.findAll();
    res.json(plataforma);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar plataforma', details: err.message });
  }
});

//  Buscar usuário por ID
PlataformaRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const plataforma = await Plataforma.findByPk(id);

    if (plataforma)
      res.json(plataforma);
    else
      res.status(404).json({ error: 'Nenhuma plataforma encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar essa plataforma', details: err.message });
  }
});

// Criar novo usuário
PlataformaRouter.post('/', async (req, res) => {
  try {
    const plataforma = Plataforma.build(req.body);
    await plataforma.validate();
    await plataforma.save();

    res.status(201).json(plataforma);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar a plataforma', details: err.message });
  }
});

//  Atualizar usuário por ID
PlataformaRouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Plataforma.update(req.body, {
      where: { id },
    });

    if (updated) {
      const PlataformaAtualizado = await Plataforma.findByPk(id);
      return res.json(PlataformaAtualizado);
    }

    return res.status(404).json({ error: 'Plataforma não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar plataforma', details: err.message });
  }
});

// Deletar usuário por ID
PlataformaRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Plataforma.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Passei o facão com sucesso! 🔪✅' });
    }

    return res.status(404).json({ error: 'Plataforma não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar Plataforma', details: err.message });
  }
});

export default PlataformaRouter;
