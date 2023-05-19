const mongoose = require('mongoose');


const pizzaSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  price: { type: Number, default: 0 },
  category: { type: String, required: true },
  stock: { type: Number, required: true, min: 0, max: 200 }
})


pizzaSchema.virtual("id").get(function () {
  return this._id.toHexString();
})


pizzaSchema.set("toJSON", {
  virtuals: true,
})


const Pizza = mongoose.model('Pizza', pizzaSchema);


module.exports = Pizza;
