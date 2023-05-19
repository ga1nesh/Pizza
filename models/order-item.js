const mongoose = require("mongoose");


const orderItemSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },
  pizza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pizza"
  }
})


const OrderItem = mongoose.model("OrderItem", orderItemSchema);


module.exports = OrderItem;
