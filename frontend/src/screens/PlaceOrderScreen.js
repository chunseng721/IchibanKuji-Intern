import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { TiTick } from 'react-icons/ti'
import { AiFillInfoCircle } from 'react-icons/ai'
import { removeFromCart } from '../actions/cartActions'
// import { ORDER_CREATE_RESET } from '../constants/orderConstants'
// import { USER_DETAILS_RESET } from '../constants/userConstants'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  }

  const cartItemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  )

  // const shippingPrice =
  //   cartItemsPrice >= freeDeliveryCutoff ? 0 : deliveryCharge
  // const totalPrice = cartItemsPrice + shippingPrice
  // cart.itemsPrice = cartItemsPrice
  // cart.shippingPrice = shippingPrice
  // cart.totalPrice = totalPrice

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      // for(let i = 0; i< order.orderItems.length; i++){
      //   removeFromCart(order.orderItems.product)
      // }
      window.location.reload()
      history.push(`/order/${order._id}`)
      // dispatch({ type: USER_DETAILS_RESET })
      //  dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])


  
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        // paymentMethod: cart.paymentMethod,
        // itemsPrice: cart.itemsPrice,
        // shippingPrice: cart.shippingPrice,
        // totalPrice: cart.totalPrice,
      }),
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: {''}</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.postCode},{' '}
                {cart.shippingAddress.city}, {cart.shippingAddress.state}
              </p>
            </ListGroup.Item>
            {/* 
            <ListGroup.Item>
              <h2>Payment</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item> */}

            <ListGroup.Item>
              <h2>Prizes</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  <ListGroup.Item>

                    <Row className="align-items-center">
                      <Col
                        className="col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2"
                        md={1}
                      ></Col>
                      <Col
                        className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 text-center"
                        md={1}
                      >
                        <Row>
                          <Col md={4}>
                            Prize
                          </Col>
                          <Col>
                            Product
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="align-items-center">
                        <Col
                          className="col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2"
                          md={1}
                        >
                          <Image
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 text-center">
                          <Row>
                            <Col md={4}>
                              {item.name}
                            </Col>
                            <Col>
                              <Link to={`/product/${item.category}`}>
                                {item.category}
                              </Link>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              {/* <ListGroup.Item>
                <h2>Prizes Summary</h2>
              </ListGroup.Item> */}
              {/* <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{formatter(cartItemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{formatter(shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{formatter(totalPrice)}</Col>
                </Row>
              </ListGroup.Item> */}
              {/* <ListGroup.Item>
                {cartItemsPrice < freeDeliveryCutoff ? (
                  <>
                    <AiFillInfoCircle size="1.4rem" color="#f4bd61" />
                    <p className="d-inline mx-2">
                      Add {formatter(freeDeliveryCutoff - cartItemsPrice)} of
                      eligible items to your order for FREE delivery.
                    </p>
                  </>
                ) : (
                  <>
                    <TiTick size="1.4rem" color="#34a853" />
                    <p className="d-inline-block mx-2">
                      You are eligible for free delivery!
                    </p>
                  </>
                )}
              </ListGroup.Item> 
              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}*/}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Deliver Prize(s)
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
