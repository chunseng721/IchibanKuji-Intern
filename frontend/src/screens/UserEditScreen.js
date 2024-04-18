import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
// import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [address, setAddress] = useState('')
  const [postCode, setPostCode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  //   useEffect(() => {
  //     if (successUpdate) {
  //       dispatch({ type: USER_UPDATE_RESET })
  //       history.push('/admin/users')
  //     } else {
  //       if (!user.name || user._id !== userId) {
  //         dispatch(getUserDetails(userId))
  //       } else {
  //         setName(user.name)
  //         setEmail(user.email)
  //         setIsAdmin(user.isAdmin)
  //       }
  //     }
  //   }, [dispatch, history, userId, user, successUpdate])

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId))
        
      } else {
        console.log(user)
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        setAddress(user.shippingAddress.address)
        setPostCode(user.shippingAddress.postCode)
        setCity(user.shippingAddress.city)
        setState(user.shippingAddress.state)
      }
    } else {
      history.push('/login')
    }
  }, [userId, dispatch, user, history, userInfo, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({
      _id: userId,
      name,
      email,
      isAdmin,
      shippingAddress: {
        address,
        postCode,
        city,
        state

      }
    }))
  }

  return (
    <>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="address" className="my-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="address"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postCode" className="my-3">
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                type="postCode"
                placeholder="Enter Postcode"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city" className="my-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="city"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="state" className="my-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="state"
                placeholder="Enter State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
            <Link to="/admin/users" className="btn btn-light ms-3">
              Go Back
            </Link>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
