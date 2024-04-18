const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')
const Product = require('../models/productModel')


// // @desc  Fetch all products
// // @route  GET /api/products
// // @access  Public
// const getCategories = asyncHandler(async (req, res) => {
//     const keyword = req.query.keyword
//         ? {
//             name: {
//                 $regex: req.query.keyword,
//                 $option: 'i',
//             }
//         }
//         : {}

//     const categories = await Category.find({ ...keyword })
//     if (categories) {
//         res.json(categories)
//     } else {
//         res.status(404)
//         throw new Error('No category found based on your search')
//     }
// })

// @desc  Fetch all categories
// @route  GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({})
    res.json(categories)

})

// @desc  Fetch single category
// @route  GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)

    if (category) {
        res.json(category)
    } else {
        res.status(404)
        throw new Error('Category not found')
    }
})


// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)

    if (category) {
        await category.remove()
        res.json({ message: 'Category removed' })
    } else {
        res.status(404)
        throw new Error('Category not found')
    }

})

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
    const {
        name,
        imageSrc,
        imageAlt,
        numberOfPrizes,
        numberOfPrizesLeft,
        specialPrize,
        userStatus,
    } = req.body


    const category = new Category({
        user: req.user._id,
        name,
        imageSrc,
        imageAlt,
        numberOfPrizes,
        numberOfPrizesLeft,
        href: "#",
        specialPrize,
        userStatus,
    })

    try {
        const createdCategory = await category.save()

        res.status(201).json(createdCategory)
    } catch (error) {
        if (error.name === 'ValidationError') {
            let errors = ''
            Object.keys(error.errors).forEach((key) => {
                errors += error.errors[key].message + '.\n'
            })
            res.status(500).json(errors)
        }
    }
})

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin

const updateCategory = asyncHandler(async (req, res) => {
    const {
        name,
        imageSrc,
        imageAlt,
        numberOfPrizes,
        numberOfPrizesLeft,
        specialPrize,
        userStatus,
    } = req.body

    const category = await Category.findById(req.params.id)

    if (category) {
        category.name = name
        category.imageSrc = imageSrc
        category.imageAlt = imageAlt
        category.numberOfPrizes = numberOfPrizes
        category.numberOfPrizesLeft = numberOfPrizesLeft
        category.specialPrize.specialPrizeName = specialPrize.specialPrizeName
        category.specialPrize.specialImageSrc = specialPrize.specialImageSrc
        category.specialPrize.specialImageAlt = specialPrize.specialImageAlt
        category.userStatus = userStatus

        try {
            const updatedCategory = await category.save()
            res.json(updatedCategory)
        } catch (error) {
            if (error.name === 'ValidationError') {
                let errors = ''
                Object.keys(error.errors).forEach((key) => {
                    errors += error.errors[key].message + '.\n'
                })
                res.status(500).json(errors)
            }
        }

    } else {
        res.status(404)
        throw new Error('Category not found')
    }
})

const updatenumberOfPrizes = asyncHandler(async (req, res, id, qty) => {
    try {
        var category = await Category.findById(id)
    } catch (err) {
        throw new Error(err.message)
    }

    if (category.numberOfPrizesLeft < qty) {
        throw new Error(
            'Sorry, there is no ' +
            qty +
            'draws left.',
        )
    }

    category.numberOfPrizesLeft -= qty

    const updatedCategory = await category.save()
    return updatedCategory
})

const getUserStatusByCategoryId = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)

    if(category){
        res.json(category.userStatus)
    }else{
        res.status(404)
        throw new Error('Category not found')
    }
})

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    updatenumberOfPrizes,
    getUserStatusByCategoryId,
}