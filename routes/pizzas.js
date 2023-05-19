const express = require('express');
const router = express.Router();
const extractFile = require('../middleware/file');
const PizzaController = require('../controllers/pizzas');


router.get('/', PizzaController.getPizzas);


router.get('/:id', PizzaController.getPizza);


router.post('/', extractFile, PizzaController.createPizza);


router.put('/:id', extractFile, PizzaController.updatePizza);


router.delete('/:id', PizzaController.deletePizza);


router.get('/get/count', PizzaController.getPizzaCount);


module.exports = router;