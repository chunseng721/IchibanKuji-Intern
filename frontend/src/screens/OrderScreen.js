import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from '../actions/orderActions'
import formatter from '../utils/currencyFormatter'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId))
    }
  }, [order, orderId, dispatch, history, userInfo, successPay, successDeliver])

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const payHandler = () => {
    dispatch(payOrder(order))
  }

  console.log(order)

  
  console.log(cart)

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <p className="ms-4">
        <strong>Order {order._id}</strong>
      </p>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: {''}</strong>
                {order.shippingAddress.address}, {order.shippingAddress.postCode},{' '}
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            {/* <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid (Updated by our executive)
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
              {order.paymentMethod === 'UPI' && (
                <>
                  <p>Send Money to this UPI address</p>
                  <p>
                    <strong>kamalev21@okicici</strong>
                  </p>
                  <p>
                    After making your payment our executive will confirm your
                    payment status.
                  </p>
                </>
              )}
            </ListGroup.Item> */}

            <ListGroup.Item>
              <h2>Delivered Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row className="align-items-center">
                      <Col
                        className="col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2"
                        md={1}
                      ></Col>
                      <Col className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 text-center">
                        <Row>
                          <Col>
                            Product
                          </Col>
                          <Col md={4} colSpan={2}>
                            Prize
                          </Col>

                        </Row>
                      </Col>
                    </Row>

                  </ListGroup.Item>
                  {order.orderItems.map((item, index) => (
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
                            <Col>
                              <Row><Link to={`/categories/${item.category}`}>
                                {item.category}
                              </Link></Row>

                            </Col>

                            <Col md={4} colSpan={2}>
                                {item.name}

                            </Col>
                            {/* <Col md={4}>
                              {item.qty} x {formatter(item.price)} ={' '}
                              {formatter(item.qty * item.price)}
                            </Col> */}
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
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Place Order Date: <span>{order.createdAt.substring(0, 10)}</span></p>
                <p>Place Order Time: <span>
                {parseInt(order.createdAt.substring(11, 13)) - 4 < 0? 
                  (parseInt(order.createdAt.substring(11, 13)) - 4 + 12)
                  :(parseInt(order.createdAt.substring(11, 13)) - 4)}
                {order.createdAt.substring(13, 19)}{parseInt(order.createdAt.substring(11, 13)) - 4 < 0? 
                  (' AM')
                  :(' PM')}</span></p>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{formatter(order.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{formatter(order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{formatter(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item> */}

              {/* {loadingPay && <Loader />}
              {userInfo && userInfo.isAdmin && !order.isPaid && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={payHandler}
                  >
                    Mark As Paid
                  </Button>
                </ListGroup.Item>
              )} */}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  )
}

export default OrderScreen
