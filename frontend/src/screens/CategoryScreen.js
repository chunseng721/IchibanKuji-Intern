import React, { useEffect, useRef, useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Product from '../components/Product'
import { listProductsByCategory } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'


import Loader from '../components/Loader'
import Message from '../components/Message'
import Banner from '../Banner.jpg'
import A from '../components/Image Folder/A.png'
import B from '../components/Image Folder/B.png'
import C from '../components/Image Folder/C.png'
import D from '../components/Image Folder/D.png'
import E from '../components/Image Folder/E.png'
import F from '../components/Image Folder/F.png'
import G from '../components/Image Folder/G.png'
import H from '../components/Image Folder/H.png'
import I from '../components/Image Folder/I.png'
import J from '../components/Image Folder/J.png'
import K from '../components/Image Folder/K.png'
import Last from '../components/Image Folder/Last.png'
import Prizelist from '../components/Prize'
import { resetPassword } from '../actions/userActions'


const CategoryScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productListByCategory)
  const { loading, error, products } = productList

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const [userStatus, setUserStatus] = useState([])

  const [category, setCategory] = useState({})

  const [isTurn, setIsTurn] = useState(false)

  const [initialProductArray, setInitialProductArray] = useState([])

  const [initialProductStatus, setInitialProductStatus] = useState(false)

  const [prizeOpened, setPrizeOpened] = useState(false)

  const [isQueue, setIsQueue] = useState(false)

  const [soldOut, setSoldOut] = useState(true)

  const [timer, setTimer] = useState('00:00:10')

  const timerId = useRef(null)

  let timeHandler
  const exitQueueCounter = () => {
    timeHandler = setTimeout(() => {
      userGetKick()
      localStorage.removeItem("queue")
    }, 20000)
    timerId.current = timeHandler
  }

  useEffect(() => {
    userGetKickById()
    return () => {
      userGetKickById()
    }
  }, [])

  useEffect(() => {
    dispatch(listProductsByCategory(match.params.category))
  }, [dispatch, match, prizeOpened])


  //Update Prize
  useEffect(() => {
    const id = setInterval(() => {
      axios
        .get(`/api/categories/${match.params.category}`)
        .then(res => {
          if (res.status === 200) {
            if (products !== [] && initialProductStatus === false) {
              setInitialProductArray(res.data)
              setInitialProductStatus(true)
            } else {
              // console.log(res.data)
              for (let i = 0; i < res.data.length; i++) {
                if (initialProductArray[i].isChosen !== res.data[i].isChosen) {
                  if (localStorage.getItem('done') !== null) {
                    if (category.userStatus.length > 0 && category.userStatus[0] === userInfo._id) {
                      clearTimeout(timerId.current)
                      exitQueueCounter()
                      clearTimer(getDeadTime())
                    }
                    setPrizeOpened(!prizeOpened)
                    setInitialProductArray(res.data)
                    localStorage.removeItem('done')
                  } else {
                    if (category.userStatus.length > 0 && category.userStatus[0] !== userInfo._id) {
                      setPrizeOpened(!prizeOpened)
                      setInitialProductArray(res.data)
                      // console.log('update')
                    }
                    // else if (category.userStatus.length > 0 && category.userStatus[0] === userInfo._id) {

                    // }
                  }
                }
              }
            }
            // console.log(timerId.current)
            // console.log(products)
            // console.log(newProducts)
          }
        })
        .catch(err => {
          console.log(err);
        })
    }, 500)
    return () => clearInterval(id);
  }, [products, initialProductArray, prizeOpened, initialProductStatus, category])


  //Update User Status
  useEffect(() => {
    const id = setInterval(() => {
      (
        axios
          .get(`/api/categories`)
          .then(res => {
            if (res.status === 200) {
              //user haven't login
              if (!userInfo) {
                for (let k = 0; k < res.data.length; k++) {
                  if (res.data[k].name === match.params.category) {
                    setCategory(res.data[k])
                  }
                }
              } else {
                for (let k = 0; k < res.data.length; k++) {
                  if (res.data[k].name === match.params.category) {
                    setUserStatus(res.data[k].userStatus)
                    setCategory(res.data[k])
                    // console.log(userStatus)  
                    if (isTurn === false) {
                      if (res.data[k].userStatus.length > 0 && res.data[k].userStatus[0] === userInfo._id) {
                        setIsTurn(true)
                        clearTimer(getDeadTime())
                        exitQueueCounter()
                      } else if (res.data[k].userStatus.length > 0 && res.data[k].userStatus[0] !== userInfo._id) {
                        for (let i = 0; i < userStatus.length; i++) {
                          if (userStatus[i] === userInfo._id) {
                            setIsQueue(true)
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

          })
          .catch(err => {
            console.log(err);
          })
      )
    }, 500);
    return () => clearInterval(id);
  }, [userStatus, isTurn, isQueue]);

  //Timer
  const Ref = useRef(null)

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total, hours, minutes, seconds
    }
  }
  const startTimer = (e) => {
    let { total, hours, minutes, seconds }
      = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }
  const clearTimer = (e) => {
    if (Ref.current) {
      clearInterval(Ref.current)
    }
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }
  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 20);
    return deadline;
  }


  //Queue
  const queueFunction = async () => {
    if (!userInfo) {
      history.push(`/login?redirect=/categories/${category.name}`)
    } else {
      for (let i = 0; i < userStatus.length; i++) {
        if (userStatus[i] === userInfo._id && i === 0) {
          alert('Queued, it is your turn now...')
          setIsTurn(true)
          setIsQueue(true)
          break
        } else if (userStatus[i] === userInfo._id && i !== 0) {
          alert('Queued, please wait for your turn...')
        }
      }
      if (isQueue === false) {
        if (isTurn === false) {
          userStatus.push(userInfo._id)
          alert('You are queued')
          await axios.put(
            `/api/categories/${category._id}`,
            {
              _id: category._id,
              name: category.name,
              imageSrc: category.imageSrc,
              imageAlt: category.imageAlt,
              href: category.href,
              numberOfPrizes: category.numberOfPrizes,
              numberOfPrizesLeft: category.numberOfPrizesLeft,
              specialPrize: {
                specialPrizeName: category.specialPrize.specialPrizeName,
                specialImageSrc: category.specialPrize.specialImageSrc,
                specialImageAlt: category.specialPrize.specialImageAlt,
              },
              userStatus: userStatus,
            },
            config,
          )
        }
        localStorage.setItem("queue", category.name)
      }
    }
    setIsQueue(false)
  }


  //Kick user when times up 
  let newCategory = {}
  let userRenewStatus = []

  const userGetKick = async () => {
    setIsTurn(true)
    await axios
      .get(`/api/categories`)
      .then(res => {
        if (res.status === 200) {
          for (let k = 0; k < res.data.length; k++) {
            if (res.data[k].name === match.params.category) {
              userRenewStatus = res.data[k].userStatus
              newCategory = res.data[k]
            }
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
    let userArray = userRenewStatus
    userArray.splice(0, 1)
    await axios.put(
      `/api/categories/${newCategory._id}`,
      {
        _id: newCategory._id,
        name: newCategory.name,
        imageSrc: newCategory.imageSrc,
        imageAlt: newCategory.imageAlt,
        href: newCategory.href,
        numberOfPrizes: newCategory.numberOfPrizes,
        numberOfPrizesLeft: newCategory.numberOfPrizesLeft,
        specialPrize: {
          specialPrizeName: newCategory.specialPrize.specialPrizeName,
          specialImageSrc: newCategory.specialPrize.specialImageSrc,
          specialImageAlt: newCategory.specialPrize.specialImageAlt,
        },
        userStatus: userArray,
      },
      config,
    )

    setIsTurn(false)
    setTimer('00:00:10')
    timerId.current = null
  }


  //Kick users whenever they leave the page or reload the page
  const userGetKickById = async () => {
    setIsTurn(true)
    if (localStorage.getItem("queue") !== null) {
      localStorage.removeItem("queue")
    }
    await axios
      .get(`/api/categories`)
      .then(res => {
        if (res.status === 200) {
          for (let k = 0; k < res.data.length; k++) {
            if (res.data[k].name === match.params.category) {
              userRenewStatus = res.data[k].userStatus
              console.log(userRenewStatus)
              newCategory = res.data[k]
              console.log(newCategory)

            }
          }

        }
      })
      .catch(err => {
        console.log(err)
      })
    let userArray = userRenewStatus

    if (userInfo) {
      for (let i = 0; i < userArray.length; i++) {
        if (userInfo._id === userArray[i]) {
          userArray.splice(i, 1)
        }
      }

      await axios.put(
        `/api/categories/${newCategory._id}`,
        {
          _id: newCategory._id,
          name: newCategory.name,
          imageSrc: newCategory.imageSrc,
          imageAlt: newCategory.imageAlt,
          href: newCategory.href,
          numberOfPrizes: newCategory.numberOfPrizes,
          numberOfPrizesLeft: newCategory.numberOfPrizesLeft,
          specialPrize: {
            specialPrizeName: newCategory.specialPrize.specialPrizeName,
            specialImageSrc: newCategory.specialPrize.specialImageSrc,
            specialImageAlt: newCategory.specialPrize.specialImageAlt,
          },
          userStatus: userArray,
        },
        config,
      )
    }

    setIsTurn(false)
    setTimer('00:00:10')
  }

  const purchaseAll = async () => {
    axios
      .get(`/api/categories`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          for (let k = 0; k < res.data.length; k++) {
            if (res.data[k].name === match.params.category) {
              console.log(res.data[k].userStatus)
              if (res.data[k].userStatus.length > 0) {
                for (let m = 0; m < res.data[k].userStatus.length; m++) {
                  if (res.data[k].userStatus[m] === userInfo._id) {
                    if (m === 0) {
                      axios
                        .get(`/api/categories/${match.params.category}`)
                        .then(res => {
                          if (res.status === 200) {
                            for (let k = 0; k < res.data.length; k++) {
                              if (res.data[k].isChosen === false) {
                                setSoldOut(false)
                              }
                            }
                            if (soldOut === false) {
                              if (window.confirm("Purchase All Prizes?")) {
                                for (let i = 0; i < res.data.length; i++) {
                                  if (res.data[i].isChosen === false)
                                    axios.put(
                                      `/api/products/${res.data[i]._id}`,
                                      {
                                        _id: res.data[i]._id,
                                        name: res.data[i].name,
                                        imageSrc: res.data[i].imageSrc,
                                        imageAlt: res.data[i].imageAlt,
                                        category: res.data[i].category,
                                        description: res.data[i].description,
                                        countInStock: res.data[i].countInStock - 1,
                                        isChosen: true,
                                      },
                                      config,
                                    )
                                  dispatch(addToCart(res.data[i]._id, parseInt('1')))
                                }
                                localStorage.setItem('done', true)
                                alert('Congratulation!')
                                setSoldOut(true)
                              }else{
                                return
                              }
                            } else {
                              alert("The prizes had been sold out...")
                            }
                          }

                        })
                        .catch(err => {
                          console.log(err)
                        })
                    } else {
                      alert("Queued, wait for your turn...")
                    }
                    break
                  }

                  if (m === res.data[k].userStatus.length - 1) {
                    alert("Please queue up...")
                  }
                }
              } else {
                alert("Please queue up...")
              }
            }
          }
        }
      })
      .catch(err => {
        console.log(err)
      })

  }





  const list = [
    { prize: 'A', total: 0, totalLeft: 0, imageSrc: A },
    { prize: 'B', total: 0, totalLeft: 0, imageSrc: B },
    { prize: 'C', total: 0, totalLeft: 0, imageSrc: C },
    { prize: 'D', total: 0, totalLeft: 0, imageSrc: D },
    { prize: 'E', total: 0, totalLeft: 0, imageSrc: E },
    { prize: 'F', total: 0, totalLeft: 0, imageSrc: F },
    { prize: 'G', total: 0, totalLeft: 0, imageSrc: G },
    { prize: 'H', total: 0, totalLeft: 0, imageSrc: H },
    { prize: 'I', total: 0, totalLeft: 0, imageSrc: I },
    { prize: 'J', total: 0, totalLeft: 0, imageSrc: J },
    { prize: 'K', total: 0, totalLeft: 0, imageSrc: K },
  ]
  //the prize left
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (products[i].name === list[j].prize) {
        list[j].total++
        list[j].totalLeft += products[i].countInStock
      }
    }
  }
  //the existing prize
  const prizeList = []
  for (let k = 0; k < list.length; k++) {
    if (list[k].total !== 0) {
      prizeList.push(list[k])
    }
  }
  //insert the special prize into the prizeList
  prizeList.push({ prize: 'Last', total: 1, totalLeft: 1, imageSrc: Last })
  //do not show special prize in the prize pool
  for (let i = 0; i < products.length; i++) {
    if (products[i].description === 'Special Prize')
      products.splice(i, 1)
  }

  return (
    <>
      <Row>
        <img src={Banner} alt='banner'></img>
      </Row>
      <Row>
        {prizeList.map((prize) => (
          <Col key={prize.prize} xs={6} sm={4} md={3} lg={3} xl={3}>
            <Prizelist prizeList={prize}> </Prizelist>
          </Col>
        ))}
      </Row>
      <h1>Latest Stocks on demand</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="my-3">
            <Col><h2>{timer}</h2></Col>
            <Col></Col>
            <Col></Col>
            <Col xs={4} sm={4} md={4} lg={3} xl={3}>
              <Button className="mx-1 float-end" size="sm" onClick={queueFunction}>Queue</Button>
              <Button className="mx-1 float-end" size="sm" onClick={purchaseAll}>Purchase All</Button>
            </Col>
          </Row>
          <Row><h2>{category.userStatus}</h2></Row>
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={6} sm={4} md={4} lg={3} xl={3}>
                <Product product={product} history={history} category={category} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default CategoryScreen