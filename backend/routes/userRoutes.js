const express = require('express')
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logoutUser,
  updateCredit,
  // getAccessToken,
} = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
// router.get('/accessToken', getAccessToken)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.post('/forgotpassword', forgotPassword)
router.patch('/resetpassword/:token', resetPassword)
router.get('/logout', logoutUser)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

module.exports = router
