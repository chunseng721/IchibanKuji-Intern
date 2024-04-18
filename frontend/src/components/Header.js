import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { BsWhatsapp, BsCart, BsCoin } from 'react-icons/bs'
import { FiPhoneCall, FiUser } from 'react-icons/fi'
import { FaCircle } from 'react-icons/fa'
import SearchBox from './SearchBox'
import { Route } from 'react-router'
import { useLocation } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const { userInfo } = userLogin
  let category = " "
  const logoutHandler = () => {
    if (localStorage.getItem("queue") !== null) {
      alert("Quited from the queue, sign out once again... Thank you. ")
    } else {
      dispatch(logout())
    }
  }
  const location = useLocation()

  var x = document.cookie

  useEffect(() => {
    if (localStorage.getItem("queue") !== null) {
      category = localStorage.getItem("queue")
    }
    
  })

  // useEffect(() => {
  //   axios
  //     .get('/api/users/accessToken')
  //     .then(res => {
  //       if (res.status === 200) {
  //         console.log(res)
  //         if(res.data.accessToken === null){
  //           dispatch(logout())
  //         }
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // })

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand id="logo-text">Ichiban</Navbar.Brand>
          </LinkContainer>
          <Nav className="nav-right">
            <Nav.Link>
              <BsWhatsapp size="1.5em" />
            </Nav.Link>

            <Nav.Link>
              <FiPhoneCall size="1.5em" />
            </Nav.Link>

            <LinkContainer to="/cart">
              <Nav.Link data-rb-event-key="cart">
                <BsCart size="1.5em" />
                {cartItems.length > 0 && <FaCircle className="cart-circle" />}
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-md-auto">
              {userInfo ? (
                <>
                  <Nav.Link className="nav-right">
                    <BsCoin size="1.5em" />
                    <>{userInfo.credit}</>

                  </Nav.Link>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={localStorage.getItem("queue") !== null ?
                      (`/categories/${localStorage.getItem("queue")}`) :
                      ("/")}>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FiUser size="1.5em" /> Login / Sign Up
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Prizes</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/carousellist">
                    <NavDropdown.Item>Carousels</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/categorylist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {
        location.pathname === '/login' ||
          location.pathname === '/register' ||
          location.pathname === '/forgotpassword' ||
          location.pathname === '/forgotpassword/:email' ? (
          ''
        ) : (
          <Route render={({ history }) => <SearchBox history={history} />} />
        )
      }
    </header >
  )
}

export default Header
