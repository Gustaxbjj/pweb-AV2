import express from 'express';
import { Avaliacao } from '../models/Index.js';

const Avaliacaorouter = express.Router();

// Buscar todas as avaliações
Avaliacaorouter.get('/', async (_req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll();
    res.json(avaliacoes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar avaliações', details: err.message });
  }
});

//  Buscar avaliação por ID
Avaliacaorouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const avaliacao = await Avaliacao.findByPk(id);

    if (avaliacao)
      res.json(avaliacao);
    else
      res.status(404).json({ error: 'Nenhuma avaliação encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar avaliação', details: err.message });
  }
});

//  Criar nova avaliação
Avaliacaorouter.post('/', async (req, res) => {
  try {
    const avaliacao = Avaliacao.build(req.body);
    await avaliacao.validate();
    await avaliacao.save();

    res.status(201).json(avaliacao);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar avaliação', details: err.message });
  }
});

Avaliacaorouter.post('/batch', async (req, res) => {
  try {
    const result = await Avaliacao.bulkCreate(req.body);
    //console.log('oioi');
    // await usuario.validate();
    //await usuario.save();

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o usuário', details: err.message, errorFull: err });
  }
});


//  Atualizar avaliação por ID
Avaliacaorouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Avaliacao.update(req.body, {
      where: { id },
    });

    if (updated) {
      const avaliacaoAtualizada = await Avaliacao.findByPk(id);
      return res.json(avaliacaoAtualizada);
    }

    return res.status(404).json({ error: 'Avaliação não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar avaliação', details: err.message });
  }
});

// Deletar avaliação por ID
Avaliacaorouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Avaliacao.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Passei o facão! 🔪✅' });
    }

    return res.status(404).json({ error: 'Avaliação não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar avaliação', details: err.message });
  }
});

export default Avaliacaorouter;
