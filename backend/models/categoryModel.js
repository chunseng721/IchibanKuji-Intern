const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please Enter Name of the Product'],
    },
    imageSrc: {
      type: String,
      required: [true, 'Please Upload an Image File'],
    },
    imageAlt: {
      type: String,
      required: [true, 'Please Enter Image Alt'],
    },
    href: {
      type: String,
      required: true,
    },
    numberOfPrizes: {
      type: Number,
      default: 0,
      required: [0, 'Please Enter Number of Draws'],
    },
    numberOfPrizesLeft: {
      type: Number,
      default: 0,
      required: [0, 'Please Enter Number of Draws Left'],
    },
    specialPrize: {
      specialPrizeName: {type: String, required: [true, 'Please Enter Name of The Special Prize']},
      specialImageSrc: {type: String, required: [true, 'Please Upload an Image File for Special Prize']},
      specialImageAlt: {type: String, required: [true, 'Please Enter Image Alt for Special Prize']}
    },
    userStatus: [{
      type: String,
      required: true,
      default: '',
    }]
  },
  {
    timestamps: true,
  },
)

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
