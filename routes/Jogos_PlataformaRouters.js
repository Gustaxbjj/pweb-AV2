import express from 'express';
import { Jogo_Plataforma } from '../models/Index.js';
import { expect } from 'chai';

const Jogos_PlataformaRouters = express.Router();

//  Buscar todos os Desenvolvedores
Jogos_PlataformaRouters.get('/', async (_req, res) => {
  try {
    const jogosPlataforma = await Jogo_Plataforma.findAll();
    res.json(jogosPlataforma);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar a plataforma deste jogo', details: err.message });
  }
});

// Buscar desenvolvedor por ID
Jogos_PlataformaRouters.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const jogosPlataforma = await Jogo_Plataforma.findByPk(id);

    if (jogosPlataforma)
      res.json(jogosPlataforma);
    else
      res.status(404).json({ error: 'Plataforma do jogo não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar a plataforma do jogo', details: err.message });
  }
});

//  Criar novo desenvolvedor
Jogos_PlataformaRouters.post('/', async (req, res) => {
  try {
    const jogosPlataforma = Jogo_Plataforma.build(req.body);
    await jogosPlataforma.validate();
    await jogosPlataforma.save();

    res.status(201).json(jogosPlataforma);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar a plataforma desse jogo', details: err.message });
  }
});

Jogos_PlataformaRouters.post('/batch', async (req, res) => {
  try {
    const result = await Jogo_Plataforma.bulkCreate(req.body);
    //console.log('oioi');
    // await usuario.validate();
    //await usuario.save();

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o usuário', details: err.message, errorFull: err });
  }
});


//  Atualizar desenvolvedor por ID
Jogos_PlataformaRouters.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Jogo_Plataforma.update(req.body, {
      where: { id },
    });

    if (updated) {
      const Jogo_PlataformaAtualizada = await Jogo_Plataforma.findByPk(id);
      return res.json(Jogo_PlataformaAtualizada);
    }

    return res.status(404).json({ error: 'Jogo e Plataforma não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar Plataforma do jogo', details: err.message });
  }
});

//  Deletar categoria por ID
Jogos_PlataformaRouters.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Jogo_Plataforma.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Passei o facão com sucesso! 🔪✅' });
    }

    return res.status(404).json({ error: 'Plataforma_Jogo não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar o Plataforma_Jogo', details: err.message });
  }
});

export default Jogos_PlataformaRouters;
