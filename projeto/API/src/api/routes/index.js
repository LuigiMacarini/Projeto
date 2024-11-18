const express = require('express');
const router = express.Router();
const users = require('./users');
const students = require('./students'); // Importando as rotas de students
const teachers = require('./teachers'); 

router.use(express.json());

router.use('/users', users);
router.use('/students', students); // Adicionando as rotas de students
router.use('/teachers', teachers); 

module.exports = router;
