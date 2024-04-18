import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Card, Col, Row, Button } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'
import { updateCountInStock } from '../actions/productActions'
import Grey from '../ticket.jpg'
import ScratchCard from 'react-scratchcard-v2'
// import WinSound from '../src_assets_sounds_win.mp3'

const Product = ({ product, history, category }) => {
  const dispatch = useDispatch()


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [show, setShow] = useState(false)
  const [finish, setFinish] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const checkOutHandler = () => {

    if (!userInfo) {
      history.push(`/login?redirect=/categories/${product.category}`)
    } else {
      if (userInfo.credit !== 0) {
        history.push(`/product/${product._id}`)
      } else {
        if (window.confirm('1 Credit will be reduced. Do you sure?')) {
          handleShow()
          dispatch(
            updateCountInStock({
              _id: product._id,
              name: product.name,
              imageSrc: product.imageSrc,
              imageAlt: product.imageAlt,
              category: product.category,
              description: product.description,
              countInStock: product.countInStock,
              isChosen: true,
            }))
          dispatch(addToCart(product._id, parseInt('1')))
        } else {
          return
        }

      }
    }
    // history.push(`/product/scratch`)
  }

  // const [showTitle, setShowTitle] = useState(false)
  // const handleShowTitle = () => setShowTitle(true)

  const checkUserArray = () => {
    {
      category.userStatus.length !== 0 && category.userStatus[0] === userInfo._id ?
      (checkOutHandler()) :
      (alert('Please queue up'))
    }
  }


  const refreshButton = () => {
    if (finish === true) {
      localStorage.setItem('done', true)
      handleClose()
    }
  }

  // const audio = new Audio(WinSound)

  // document.onkeydown = function (event) {
  //   if (event.keyCode === 116) {
  //     event.preventDefault()
  //   }
  // }


  return (
    <>
      <Card className="my-3 mx-0 p-1 rounded" >
        <Row className="align-items-center justify-content-center">
          <Col className="col-5" xs={8} sm={8} md={8} xl={12}>
            {product.isChosen ? (
              <Card.Img src={product.imageSrc} alt="product" />
            ) : (
              <Card.Img src={Grey} alt="product" onClick={checkUserArray} />
            )
            }

          </Col>
        </Row>
      </Card>

      <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static" keyboard={false} >
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ScratchCard
            width={775}
            height={426}
            image={require('../ticket.jpg')}
            finishPercent={70}
            onComplete={() => [setFinish(true)]}
            customBrush={{
              image: require('../newcircle.png'),
              width: 100,
              height: 100
            }}>
            <div style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img width="780" height="426" src={product.imageSrc} alt="product"></img>
            </div>
          </ScratchCard>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={refreshButton}
            as={Col}
            variant="primary">
            Alright
          </Button>


        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Product
