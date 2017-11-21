const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  list: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: 'Problem',
    },
  ],
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
