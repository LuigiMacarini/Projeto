const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Conexão com MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});

// Definindo o esquema do usuário com novos nomes de atributos
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  level: { type: String, required: true },
  status: { type: Boolean, required: true },
  created_at: { type: Date, default: Date.now }
});

// Modelo do usuário
const User = mongoose.model('User', userSchema);

// Retornar todos os usuários
// GET "/users"
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retornar um usuário específico pelo nome
// GET /users/name/:name
router.get('/name/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const user = await User.findOne({ name: name });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retornar um usuário específico pelo ID
// GET /users/id/:id
router.get('/id/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Inserir um novo usuário
// POST "/users"
router.post('/', async (req, res) => {
  try {
    const novoUser = await User.create(req.body);
    console.log(novoUser);
    res.status(201).json({ message: "Usuário salvo com sucesso!", newUser: novoUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Atualizar um usuário pelo ID
// PUT "/users/id/:id"
router.put('/id/:id', async (req, res) => {
  const id = req.params.id;
  const novoUser = req.body;
  try {
    const userAtualizado = await User.findByIdAndUpdate(id, novoUser, { new: true });
    if (!userAtualizado) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(userAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar um usuário pelo ID
// DELETE "/users/id/:id"
router.delete('/id/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const userDeletado = await User.findByIdAndDelete(id);
    if (!userDeletado) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(userDeletado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
