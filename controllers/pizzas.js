const Pizza = require('../models/pizza');
const mongoose = require("mongoose");


exports.getPizzas = async (req, res) => {
    const pizza = await Pizza.find();
    if (!pizza) return res.status(500).send('cannot get pizza');
    res.status(200).send(pizza);
}

exports.getPizza = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid pizza id');
    }
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(500).send('cannot get pizza');
    res.status(200).send(pizza);
}


exports.createPizza = (req, res) => {
    if (!req.file) return res.status(400).send('image not found');
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
    const pizza = new Pizza({
        name: req.body.name,
        description: req.body.description,
        image: imagePath,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
    })
    pizza.save().then(() => {
        res.status(200).send(pizza);
    }).catch(() => {
        res.status(500).send('cannot add pizza');
    })
}


exports.updatePizza = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid pizza id');
    }
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(400).send('invalid pizza');
    let imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    else {
        imagepath = pizza.image;
    }
    const updatedPizza = await Pizza.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            image: imagePath,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock
        },
        { new: true }
    )
    if (!updatedPizza) return res.status(500).send('cannot update pizza');
    res.status(200).send(updatedPizza);
}


exports.deletePizza = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid pizza id');
    }
    const pizza = await Pizza.findByIdAndRemove(req.params.id);
    if (!pizza) res.status(500).send('cannot delete pizza');
    res.status(200).send(pizza);
}


exports.getPizzaCount = async (req, res) => {
    const pizzaCount = await Pizza.countDocuments();
    if (!pizzaCount) {
        return res.status(500).json({ success: false });
    }
    res.send({ pizzaCount: pizzaCount });
}