import express from 'express';
import { Jogo } from '../models/Index.js';
import { expect } from 'chai';

const Jogosrouter = express.Router();

//  Buscar todos os Desenvolvedores
Jogosrouter.get('/', async (_req, res) => {
  try {
    const jogos = await Jogo.findAll();
    res.json(jogos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o jogo', details: err.message });
  }
});

// Buscar desenvolvedor por ID
Jogosrouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const jogos = await Jogo.findByPk(id);

    if (jogos)
      res.json(jogos);
    else
      res.status(404).json({ error: 'jogo não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar o jogo', details: err.message });
  }
});

//  Criar novo desenvolvedor
Jogosrouter.post('/', async (req, res) => {
  try {
    const jogos = Jogo.build(req.body);
    await jogos.validate();
    await jogos.save();

    res.status(201).json(jogos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar a jogo', details: err.message });
  }
});

//  Atualizar desenvolvedor por ID
Jogosrouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Jogo.update(req.body, {
      where: { id },
    });

    if (updated) {
      const JogoAtualizada = await Jogo.findByPk(id);
      return res.json(JogoAtualizada);
    }

    return res.status(404).json({ error: 'Jogo não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar Jogo', details: err.message });
  }
});

//  Deletar categoria por ID
Jogosrouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Jogo.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Passei o facão com sucesso! 🔪✅' });
    }

    return res.status(404).json({ error: 'Jogo não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar o Jogo', details: err.message });
  }
});

export default Jogosrouter;
