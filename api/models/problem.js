const mongoose = require('mongoose');

const { Schema } = mongoose;

const problemSchema = new Schema({
  statement: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    default: null,
  },
  // category: {
  //   type: Schema.Types.ObjectId,
  //   default: [],
  //   ref: 'Category'
  // }
});

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
