const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Conexão com o MongoDB
/* mongoose.connect('mongodb://127.0.0.1:27017/eventsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); se deixar dá erro*/

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});

// Definindo o schema do evento
const eventSchema = new mongoose.Schema({
  description: { type: String, required: true },
  comments: { type: String, required: true },
  date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);

// GET - Listar todos os eventos
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar os eventos' });
  }
});

// GET - Buscar evento por ID
router.get('/id/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o evento' });
  }
});

// POST - Criar um novo evento
router.post('/', async (req, res) => {
  const { description, comments, date } = req.body;
  try {
    const newEvent = await Event.create({
      description,
      comments,
      date,
    });
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar o evento' });
  }
});

// PUT - Atualizar um evento por ID
router.put('/id/:id', async (req, res) => {
  const { description, comments, date } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { description, comments, date },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar o evento' });
  }
});

// DELETE - Remover um evento
router.delete('/id/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }
    res.status(200).json(deletedEvent);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover o evento' });
  }
});

module.exports = router;
