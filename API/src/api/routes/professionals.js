const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Conectando ao MongoDB
//mongoose.connect('mongodb://127.0.0.1:27017/profissionaisDB');

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});

// Definição do schema de Profissionais
const profissionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  contact: { type: String, required: true },
  phone_number: { type: String, required: true },
  status: { type: Boolean, required: true },
  created_at: { type: Date, default: Date.now }
});

const Profissional = mongoose.model('Profissional', profissionalSchema);

// Retorna todos os profissionais
// GET "/profissionais"
router.get('/', async (req, res) => {
  try {
    const profissionais = await Profissional.find();
    res.status(200).json(profissionais);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retorna um profissional específico pelo ID
// GET "/profissionais/:id"
router.get('/id/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const profissional = await Profissional.findById(id);
    if (!profissional) {
      return res.status(404).json({ error: 'Profissional não encontrado!' });
    }
    res.json(profissional);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adiciona um novo profissional
// POST "/profissionais" BODY { "nome": "Nome do profissional" }
router.post('/', async (req, res) => {
  const newProfissional = req.body;
  try {
    const profissional = await Profissional.create(newProfissional);
    res.status(201).json(profissional);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualiza um profissional pelo ID
// PUT "/profissionais/:id" BODY { "nome": "Novo nome do profissional" }
router.put('/id/:id', async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const updatedProfissional = await Profissional.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedProfissional) {
      return res.status(404).json({ error: 'Profissional não encontrado!' });
    }
    res.json(updatedProfissional);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove um profissional pelo ID
// DELETE "/profissionais/:id"
router.delete('/id/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProfissional = await Profissional.findByIdAndDelete(id);
    if (!deletedProfissional) {
      return res.status(404).json({ error: 'Profissional não encontrado!' });
    }
    res.json(deletedProfissional);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
