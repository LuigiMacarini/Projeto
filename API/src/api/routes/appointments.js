const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Conectar ao MongoDB
// se deixar da problema

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});

// Definir o esquema de agendamento
const appointmentSchema = new mongoose.Schema({
  specialty: { type: String, required: true },
  comments: { type: String, required: true },
  date: { type: Date, required: true },
  student: { type: String, required: true },
  professional: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// Criar o modelo de agendamento
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Retornar todos os agendamentos
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retornar um agendamento específico pelo ID
router.get('/id/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ erro: "Agendamento não encontrado" });
    }
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o agendamento'  });
  }
});

// Inserir um novo agendamento
router.post('/', async (req, res) => {
  const appointment = req.body;

  try {
    const newAppointment = new Appointment(appointment);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar um agendamento pelo ID
router.put('/id/:id', async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedAppointment) {
      return res.status(404).json({ erro: "Agendamento não encontrado" });
    }
    res.json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar um agendamento pelo ID
router.delete('/id/:id', async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ erro: "Agendamento não encontrado" });
    }
    res.status(200).json(deletedAppointment);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover o agendamento' });
  }
});


module.exports = router;
