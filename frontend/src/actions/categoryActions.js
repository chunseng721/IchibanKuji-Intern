import axios from 'axios'

import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
} from '../constants/categoryConstants'

import {
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants'

import { logout } from './userActions'

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST })
    const { data } = await axios.get(`/api/categories`)
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCategoriesDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/categories`)

    for (var i = 0; i < data.length; i++) {
      if (data[i]._id === id) {
        const data2 = data[i]
        dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data2 })
      }
    }

  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    })

    await axios.delete(`/api/categories/${id}`)

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const { data } = await axios.post(`/api/categories`, category, config)

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateCategory = (category, oldCategory) => async (dispatch, getState) => {
  const productlist = await axios.get(`/api/categories/${oldCategory}`)
  // console.log(oldCategory)
  // console.log(category)
  // console.log(data)
  // console.log(productlist)

  for (var i = 0; i < productlist.data.length; i++) {
    const product = {
      _id: productlist.data[i]._id,
      name: productlist.data[i].name,
      // price: productlist.data[i].price,
      // mrp,
      imageSrc: productlist.data[i].imageSrc,
      imageAlt: productlist.data[i].imageAlt,
      category: category.name,
      description: productlist.data[i].description,
      countInStock: productlist.data[i].countInStock,
      isChosen: productlist.data[i].isChosen,
    }
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.put(
        `/api/products/${productlist.data[i]._id}`,
        product,
        config,
      )

      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: message,
      })
    }
  }
  try {
    dispatch({
      type: CATEGORY_UPDATE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      `/api/categories/${category._id}`,
      category,
      config,
    )


    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: message,
    })
  }

}

export const resetnumberOfPrizesLeft = (category, qty) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_UPDATE_REQUEST,
    })
    // console.log('1')
    // console.log(category)
    category.numberOfPrizesLeft -= qty
    // console.log(category.numberOfPrizesLeft)
    // console.log(category)
    

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    // console.log(category)
    const { data } = await axios.put(
      `/api/categories/${category._id}`,
      category,
      config,
    )


    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: message,
    })
  }

}