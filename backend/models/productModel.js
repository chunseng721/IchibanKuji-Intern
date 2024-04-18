const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please Enter Name of the Prize [A/B/C'],
    },
    imageSrc: {
      type: String,
      required: [true, 'Please Upload an Image File'],
    },
    imageAlt: {
      type: String,
      required: [true, 'Please Enter Image Alt'],
    },
    category: {
      type: String,
      required: [true, 'Please Enter Category of the Prize'],
    },
    description: {
      type: String,
      required: [true, 'Please Enter Description of the Prize'],
    },
    // price: {
    //   type: Number,
    //   required: [true, 'Please Enter Price of Product'],
    //   default: 0,
    //   min: [0, 'Price should be greater than or equal to 0'],
    // },
    // mrp: {
    //   type: Number,
    //   required: [true, 'Please Enter MRP of the Product'],
    //   default: 0,
    //   min: [0, 'MRP should be greater than or equal to 0'],
    // },
    countInStock: {
      type: Number,
      required: [true, 'Please Enter Stock of the Prize'],
      default: 0,
      min: [0, 'Count In Stock value should be greater than or equal to 0'],
    },

    isChosen: {
      type: Boolean,
      required: true,
      default: false,      
    },

  },
  {
    timestamps: true,
  },
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
