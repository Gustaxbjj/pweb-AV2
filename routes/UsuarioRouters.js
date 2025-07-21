import express from 'express';
import { Usuario } from '../models/Index.js';

const Usuariorouter = express.Router();

// Buscar todos os usuários
Usuariorouter.get('/', async (_req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários', details: err.message });
  }
});

//  Buscar usuário por ID
Usuariorouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario)
      res.json(usuario);
    else
      res.status(404).json({ error: 'Nenhum usuário encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar usuário', details: err.message });
  }
});

// Criar novo usuário
Usuariorouter.post('/', async (req, res) => {
  try {
    const usuario = await Usuario.build(req.body);
    //console.log('oioi');
    await usuario.validate();
    await usuario.save();

    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o usuário', details: err.message, errorFull: err });
  }
});

Usuariorouter.post('/batch', async (req, res) => {
  try {
    const result = await Usuario.bulkCreate(req.body);
    //console.log('oioi');
    // await usuario.validate();
    //await usuario.save();

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o usuário', details: err.message, errorFull: err });
  }
});



//  Atualizar usuário por ID
Usuariorouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Usuario.update(req.body, {
      where: { id },
    });

    if (updated) {
      const usuarioAtualizado = await Usuario.findByPk(id);
      return res.json(usuarioAtualizado);
    }

    return res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: err.message });
  }
});

// Deletar usuário por ID
Usuariorouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Usuario.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Passei o facão com sucesso! 🔪✅' });
    }

    return res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar usuário', details: err.message });
  }
});

export default Usuariorouter;
