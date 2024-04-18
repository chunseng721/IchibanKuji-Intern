const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} = require('../controllers/productController')
const { protect, admin } = require('../middleware/authMiddleware')

router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, updateProduct)



  // asyncHandler(async (req, res) => {
  //   const product = await Product.findById(req.params.id)
  //   if (product) {
  //     res.json(product)
  //   } else {
  //     res.status(404)
  //     throw new Error('Product not found')
  //   }
  // })
  
module.exports = router
