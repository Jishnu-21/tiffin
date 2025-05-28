const mongoose = require('mongoose');

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ['breakfast', 'lunch', 'dinner'],
    },
    type: {
      type: String,
      required: true,
      default: 'main dish',
    },
    cuisine: {
      type: String,
      required: true,
      default: 'Indian',
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
