const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    image2:{
      type:String,
      default:''
    }
  });
  
storeSchema.virtual("id").get(function () {
  return this._id.toHexString();
})


storeSchema.set("toJSON", {
  virtuals: true,
})


  const Store=mongoose.model("Store", storeSchema);
module.exports = Store
  