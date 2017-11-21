const mongoose = require('mongoose');

const { Schema } = mongoose;

const homeworkSchema = new Schema({
  date: {
    type: Date,
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

const Homework = mongoose.model('Homework', homeworkSchema);
module.exports = Homework;
