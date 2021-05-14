const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const destinySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }, 
  date: String,
  city: String,
  description: String,
  duration: String,
  places: [],
  imageUrl: String,
});

const Destiny = mongoose.model("Destiny", destinySchema);

module.exports = Destiny;
