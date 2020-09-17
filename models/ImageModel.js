const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: { type: String, required: true },
  productImage: { type: String, required: true },
});

module.exports = mongoose.model('Images', ImageSchema);
