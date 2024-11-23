const express = require('express');
const router = express.Router();
const users = require('./users');
const students = require('./students'); // Importando as rotas de students
const teachers = require('./teachers'); 
const events = require('./events'); 
const professionals = require('./professionals'); 
const appointments = require('./appointments')

router.use(express.json());

router.use('/users', users);
router.use('/students', students); // Adicionando as rotas de students
router.use('/teachers', teachers); 
router.use('/events', events); 
router.use('/professionals', professionals)
router.use('/appointments', appointments)

module.exports = router;
