import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import { locations } from '../data/LocationsAvailable' // Locations is an Array of objects, which includes a hierarchy of countries > States > cities

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  console.log(cart)
  console.log(shippingAddress)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [address, setAddress] = useState(
    userInfo.shippingAddress.address 
  )
  const [postCode, setPostCode] = useState(
    userInfo.shippingAddress.postCode
  )
  const [city, setCity] = useState(
    userInfo.shippingAddress.city
  )
  const [state, setState] = useState(
    userInfo.shippingAddress.state
  )

  // the Ternary operator in useState Hook is used because Firs time the User came and it does not have any Cart Address available, So to Prevent this Error !! A component is changing an uncontrolled input to be controlled. !! we uses the Ternary
  // const [address, setAddress] = useState(
  //   userInfo.shippingAddress.address && userInfo.shippingAddress.address? userInfo.shippingAddress.address : "",
  // )
  // const [postCode, setPostCode] = useState(
  //   userInfo.shippingAddress.postCode && userInfo.shippingAddress.postCode? userInfo.shippingAddress.postCode : "",
  // )
  // const [city, setCity] = useState(
  //   userInfo.shippingAddress.city && userInfo.shippingAddress.city? userInfo.shippingAddress.city : "",
  // )
  // const [state, setState] = useState(
  //   userInfo.shippingAddress.state && userInfo.shippingAddress.state? userInfo.shippingAddress.state : "",
  // )
  // const [country, setCountry] = useState(
  //   shippingAddress.country && shippingAddress.country
  //     ? shippingAddress.country
  //     : '',
  // )

  // // Once we Receive the Country we will find the State from our Country array in Locations Object and find the the States Available in it.
  // const statesAvl = locations.countries.find(
  //   ({ countryName }) => countryName === country,
  // )
  // // Once we Receive the StatesAvl we will find the Cities from our statesAvl object and then iterate through the Cities in it.
  // const citiesAvl = statesAvl?.states.find(
  //   ({ stateName }) => stateName === state,
  // )

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postCode, state }))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <CheckoutSteps step1 />
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="postalCode">
          <Form.Label>Post Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postCode}
            required
            onChange={(e) => setPostCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* <Form.Group className="my-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            as="select"
            type="text"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>{'Select Country...'}</option>
            {locations.countries.map((value, key) => {
              return (
                <option value={value.countryName} key={key}>
                  {value.countryName}
                </option>
              )
            })}
          </Form.Control>
        </Form.Group> */}

        <Form.Group className="my-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            placeholder="Enter city"
            required
            onChange={(e) => setCity(e.target.value)}
          >
            
          </Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter state"
            value={state}
            required
            onChange={(e) => setState(e.target.value)}
          >
            
          </Form.Control>
        </Form.Group>


        <Button className="my-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
