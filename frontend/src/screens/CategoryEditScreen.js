import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listCategoriesDetails, listCategories, updateCategory } from '../actions/categoryActions'
import {
    CATEGORY_DETAILS_RESET,
    CATEGORY_UPDATE_RESET,
    CATEGORY_UPDATE_FAIL,
} from '../constants/categoryConstants'


const CategoryEditScreen = ({ match, history }) => {
    const categoryId = match.params.id

    const [name, setName] = useState('')
    const [imageSrc, setImageSrc] = useState('')
    const [imageAlt, setImageAlt] = useState('')
    const [href, sethref] = useState('#')
    const [numberOfPrizes, setnumberOfPrizes] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [uploading1, setUploading1] = useState(false)
    const [specialPrizeName, setSpecialPrizeName] = useState('')
    const [specialImageSrc, setSpecialImageSrc] = useState('')
    const [specialImageAlt, setSpecialImageAlt] = useState('')

    const dispatch = useDispatch()
    const categoryDetails = useSelector((state) => state.categoryDetails)
    const { loading, error, category } = categoryDetails

    const categoryUpdate = useSelector((state) => state.categoryUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = categoryUpdate

    const productList = useSelector((state) => state.productList)
    const { products } = productList

    useEffect(() => {
        dispatch(listCategories())
    }, [dispatch])

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET })
            dispatch({ type: CATEGORY_DETAILS_RESET })
            history.push('/admin/categorylist')
        } else {
            if (!category.name || category._id !== categoryId) {
                dispatch(listCategoriesDetails(categoryId))
            } else {
                setName(category.name)
                setImageSrc(category.imageSrc)
                setImageAlt(category.imageAlt)
                setnumberOfPrizes(category.numberOfPrizes)
                setSpecialPrizeName(category.specialPrize.specialPrizeName)
                setSpecialImageSrc(category.specialPrize.specialImageSrc)
                setSpecialImageAlt(category.specialPrize.specialImageAlt)
            }
        }
    }, [dispatch, history, category, categoryId, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImageSrc(data)
            setUploading(false)
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            dispatch({
                type: CATEGORY_UPDATE_FAIL,
                payload: message,
            })
            setImageSrc('')
            setUploading(false)
        }
    }

    const uploadFileHandler1 = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading1(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setSpecialImageSrc(data)
            setUploading1(false)
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            dispatch({
                type: CATEGORY_UPDATE_FAIL,
                payload: message,
            })
            setSpecialImageSrc('')
            setUploading1(false)
        }
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateCategory({
                _id: categoryId,
                name,
                imageSrc,
                imageAlt,
                href,
                numberOfPrizes,
                numberOfPrizesLeft: category.numberOfPrizesLeft,
                specialPrize: {
                    specialPrizeName,
                    specialImageSrc,
                    specialImageAlt,
                }
            }, category.name)
        )
        // console.log(category.name)
    }

    return (
        <>
            <FormContainer>
                <h1>Edit Category</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group className="my-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter Category Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image-file">
                            <Row>
                                <Col>
                                    <Form.Label>Upload Category Image</Form.Label>
                                    <Form.File
                                        id="image-file"
                                        size="sm"
                                        custom
                                        variant="secondary"
                                        onChange={uploadFileHandler}
                                    ></Form.File>
                                </Col>
                                <Col>
                                    {uploading && <Loader />}
                                    {!uploading && imageSrc && (
                                        <img
                                            src={imageSrc}
                                            className={'m-2'}
                                            width={100}
                                            height={100}
                                            alt="category"
                                        />
                                    )}
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="my-3" controlId="imageAlt">
                            <Form.Label>Image Alt</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Image Alt"
                                value={imageAlt}
                                onChange={(e) => setImageAlt(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className="my-3" controlId="numberOfPrizes">
                            <Form.Label>Number of Prizes</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Draw's Number"
                                value={numberOfPrizes}
                                onChange={(e) => setnumberOfPrizes(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className="my-3" controlId="specialPrizeName">
                            <Form.Label>Special Prize Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter Special Prize's Name"
                                value={specialPrizeName}
                                onChange={(e) => setSpecialPrizeName(e.target.value)}
                                disabled = {true}
                            ></Form.Control>
                        </Form.Group>



                        <Form.Group controlId="image-file1">
                            <Row>
                                <Col>
                                    <Form.Label>Upload Special Prize Image</Form.Label>
                                    <Form.File
                                        id="image-file1"
                                        size="sm"
                                        custom
                                        variant="secondary"
                                        onChange={uploadFileHandler1}
                                        disabled = {true}
                                    ></Form.File>
                                </Col>
                                <Col>
                                    {uploading1 && <Loader />}
                                    {!uploading1 && specialImageSrc && (
                                        <img
                                            src={specialImageSrc}
                                            className={'m-2'}
                                            width={100}
                                            height={100}
                                            alt="specialPrizeSrc"
                                        />
                                    )}
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="my-3" controlId="specialImageAlt">
                            <Form.Label>Special Prize's Image Alt</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Special Prize's Image Alt"
                                value={specialImageAlt}
                                onChange={(e) => setSpecialImageAlt(e.target.value)}
                                disabled = {true}
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                        <Link to="/admin/categorylist" className="btn btn-light my-3 ms-3">
                            Go Back
                        </Link>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default CategoryEditScreen