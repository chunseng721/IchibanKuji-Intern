import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { CATEGORY_CREATE_FAIL } from '../constants/categoryConstants'
import { createCategory } from '../actions/categoryActions'
import { listCategories } from '../actions/categoryActions'
import { createProduct } from '../actions/productActions'

const CreateCategoryScreen = ({ history }) => {
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
    const [userStatus, setUserStatus] = useState([])

    const dispatch = useDispatch()

    const categoryCreate = useSelector((state) => state.categoryCreate)
    const { loading, error, success } = categoryCreate

    useEffect(() => {
        if (success) {
            history.push('/admin/categoryList')
        }
    }, [success, history])

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
                type: CATEGORY_CREATE_FAIL,
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
                type: CATEGORY_CREATE_FAIL,
                payload: message,
            })
            setSpecialImageSrc('')
            setUploading1(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createCategory({
                name,
                imageSrc,
                imageAlt,
                href,
                numberOfPrizes,
                numberOfPrizesLeft: numberOfPrizes,
                specialPrize:{
                    specialPrizeName,
                    specialImageSrc,
                    specialImageAlt,
                },
                userStatus,
            })
        )
        dispatch(
            createProduct({
                name: specialPrizeName,
                imageSrc: specialImageSrc,
                imageAlt: specialImageAlt,
                category: name,
                description: 'Special Prize',
                countInStock: 1,
            })
        )
    }

    return (
        <>
            <FormContainer>
                <h1>Create Category</h1>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

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
                                <Form.Label>Upload Product Image</Form.Label>
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
                                        alt="product"
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
                            ></Form.Control>
                        </Form.Group>

                    <Button className="my-3" type="submit" variant="primary">
                        Create
                    </Button>
                    <Link to="/admin/categorylist" className="btn btn-light my-3 ms-3">
                        Go Back
                    </Link>
                </Form>
            </FormContainer>
        </>
    )
}


export default CreateCategoryScreen