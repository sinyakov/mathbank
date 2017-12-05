const mongoose = require('mongoose');

const { Schema } = mongoose;

const homeworkSchema = new Schema({
  title: {
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

const Homework = mongoose.model('Homework', homeworkSchema);

Homework.getHomework = (response, id, onHomework, onError) => {
  Homework.findById(id)
    .populate('list')
    .exec((error, homework) => {
      if (error) {
        if (onError) return onError(error);
        return response.status(500).send('Неверный формат идентификатора');
      } else if (!homework) {
        if (onError) return onError(error);
        return response.status(404).send('Домашнее задание не найдено');
      }
      const mappedHomework = { title: homework.title, list: homework.list, id: homework.id };
      if (onHomework) return onHomework(mappedHomework);
      return response.status(200).json(mappedHomework);
    });
};

Homework.createHomework = (response, homework, onCreate, onError) => {
  Homework.create(homework, (error, createdHomework) => {
    if (error) {
      if (onError) return onError(error);
      return response.status(500).send('Ошибка во время добавления домашнего задания');
    }
    if (onCreate) return onCreate(createdHomework);
    return response.status(200).json(createdHomework);
  });
};

module.exports = Homework;
