import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, ButtonGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants'
import { deleteCategory, listCategories } from '../actions/categoryActions'

const CategoryListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const categoryList = useSelector((state) => state.categoryList)
    const { loading, error, categories } = categoryList

    const categoryDelete = useSelector((state) => state.categoryDelete)
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = categoryDelete

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    console.log(categories)
    useEffect(() => {
        dispatch({ type: CATEGORY_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        } else {
            dispatch(listCategories())
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Delete this category?')) {
            dispatch(deleteCategory(id))
        }
    }

    const createCategoryHandler = () => {
        history.push('/admin/createcategory')
    }

    return (
        <>
            <Row>
                <Col>
                    <h1>Categories</h1>
                </Col>
                <Col className="text-end">
                    <Button className="my-3" onClick={createCategoryHandler}>
                        <i className="fas fa-plus"></i> Create Category
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>CATEGORY ID</th>
                            <th>NAME </th>
                            <th>NUMBER OF PRIZES</th>
                            <th>NUMBER OF PRIZES LEFT</th>
                            <th>SPECIAL PRIZE'S NAME</th>
                            <th>OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id}>
                                <td>{category._id}</td>
                                <td>{category.name}</td>
                                <td>{category.numberOfPrizes}</td>
                                <td>{category.numberOfPrizesLeft}</td>
                                <td>{category.specialPrize.specialPrizeName}</td>
                                <td>
                                    <ButtonGroup>
                                        <LinkContainer to={`/admin/category/${category._id}/edit`}>
                                            <Button variant="light" className="btn-sm m-2 mt-0">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant="danger"
                                            className="btn-sm m-2 mt-0"
                                            onClick={() => deleteHandler(category._id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default CategoryListScreen
