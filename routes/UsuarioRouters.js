import express from 'express'
import { Usuario } from '../models/Index.js';
import { expect } from 'chai'

const Usuariorouter = express.Router();

Usuariorouter.get('/', async(_req, res) =>{
    const usuarios = await Usuario.findAll();
    res.json(usuarios)
})

Usuariorouter.post('/', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body); 
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



export default Usuariorouter