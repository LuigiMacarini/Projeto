const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Conexão com MongoDB
//mongoose.connect('mongodb://127.0.0.1:27017/studentsDB', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});

// Definindo o esquema do estudante
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  parents: { type: String, required: true },
  phone_number: { type: String, required: true },
  special_needs: { type: String, required: true },
  status: { type: Boolean, required: true },
  created_at: { type: Date, default: Date.now }
});

// Modelo do estudante
const Student = mongoose.model('Student', studentSchema);

// Retornar todos os estudantes
// GET "/data/students"
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retornar um estudante específico pelo nome
// GET /data/students/name/:name
router.get('/name/:name', async (req, res) => {
  const nome = req.params.name;
  try {
    const estudante = await Student.findOne({ name: nome });
    if (!estudante) return res.status(404).json({ erro: 'Estudante não encontrado' });
    res.json(estudante);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retornar um estudante específico pelo ID
// GET /data/students/id/:id
router.get('/id/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const estudante = await Student.findById(id);
    if (!estudante) return res.status(404).json({ erro: 'Estudante não encontrado' });
    res.json(estudante);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Inserir um novo estudante
// POST "/data/students"
router.post('/', async (req, res) => {
  const estudante = req.body;
  try {
    const novoEstudante = await Student.create(estudante);
    res.status(201).json(novoEstudante);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar um estudante pelo ID
// PUT "/data/students/id/:id"
router.put('/id/:id', async (req, res) => {
  const id = req.params.id;
  const novoEstudante = req.body;
  try {
    const estudanteAtualizado = await Student.findByIdAndUpdate(id, novoEstudante, { new: true });
    if (!estudanteAtualizado) return res.status(404).json({ erro: 'Estudante não encontrado' });
    res.json(estudanteAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar um estudante
// DELETE "/data/students/id/:id"
router.delete('/id/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const estudanteDeletado = await Student.findByIdAndDelete(id);
    if (!estudanteDeletado) return res.status(404).json({ erro: 'Estudante não encontrado' });
    res.json(estudanteDeletado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
