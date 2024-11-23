const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Conectando ao MongoDB
//mongoose.connect('mongodb://127.0.0.1:27017/teachersDB', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});

// Definindo o schema do professor
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  school_disciplines: { type: String, required: true },
  contact: { type: String, required: true },
  phone_number: { type: String, required: true },
  status: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// Criando o modelo do professor
const Teacher = mongoose.model('Teacher', teacherSchema);

// Retornar todos os professores
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retornar um professor específico pelo nome
router.get('/name/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const teacher = await Teacher.findOne({ name: name });
    if (!teacher) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retornar um professor específico pelo ID
router.get('/id/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Inserir um novo professor
router.post('/', async (req, res) => {
  const professor = req.body;
  
  try {
    const novoProfessor = new Teacher(professor);
    await novoProfessor.save();
    res.status(201).json(novoProfessor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Atualizar um professor pelo ID
router.put('/id/:id', async (req, res) => {
  const id = req.params.id;
  const atualizacoes = req.body;

  try {
    const professorAtualizado = await Teacher.findByIdAndUpdate(id, atualizacoes, { new: true });
    if (!professorAtualizado) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    res.json(professorAtualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar um professor pelo ID
router.delete('/id/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const professorDeletado = await Teacher.findByIdAndDelete(id);
    if (!professorDeletado) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    res.json(professorDeletado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
