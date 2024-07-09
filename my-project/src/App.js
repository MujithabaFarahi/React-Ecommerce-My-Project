import './App.css';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import CartPage from './Pages/CartPage';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import ShippingAddressPage from './Pages/ShippingAddressPage';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import React, { useContext } from 'react';
import { Store } from './Store';
import ProfilePage from './Pages/ProfilePage';
import ProtectedRoute from './Components/ProtectedRoutes';
import AdminRoute from './Components/AdminRoutes';
import ProductListPage from './Pages/ProductListPage';
import ProductEditPage from './Pages/ProductEditPage';
import UserListPage from './Pages/UserListPage';
import UserEditPage from './Pages/UserEditPage';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    window.location.href = '/signin';
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position={'bottom-center'} limit={1} />
        <header>
          <Navbar bg="light" variant="light" expand={'lg'}>
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className={'title-logo'}>
                  <img
                    src="/images/logo.jpg"
                    // width="30"
                    height="50"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to={'/'} className={'nav-link'}>
                    Home
                  </Link>
                  <Link to={'/allproducts'} className={'nav-link'}>
                    All Products
                  </Link>
                  <Link to={'/about'} className={'nav-link'}>
                    About
                  </Link>
                  <Link to={'/about'} className={'nav-link'}>
                    Contact Us
                  </Link>
                </Nav>
                <Nav className="me-auto w-100 justify-content-end">
                  {/*<div className="me-auto w-50 justify-content-center">*/}
                  {/*    <Nav.Link href="#home">Home</Nav.Link>*/}
                  {/*    <Nav.Link href="#link">Link</Nav.Link>*/}
                  {/*</div>*/}
                  <Link to={'/cart'} className={'nav-link'}>
                    <i className="fa fa-shopping-cart"></i>
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg={'danger'}>
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown
                      title={userInfo.name}
                      id={'basic-nav-dropdown'}
                    >
                      <LinkContainer to={'/profile'}>
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className={'dropdown-item'}
                        to={'#signout'}
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link to={'/signin'} className={'nav-link'}>
                      <i className="fa fa-sign-in-alt m-1"></i>
                      Sign In
                    </Link>
                  )}
                  {userInfo ? (
                    <p></p>
                  ) : (
                    <Link to={'/signup'} className={'nav-link'}>
                      <i className="fa fa-user-plus m-1"></i>
                      Sign Up
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title={'Admin'} id={'admin-nav-dropdown'}>
                      <LinkContainer to={'/admin/products'}>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      {/*<LinkContainer to={"/admin/orders"}>*/}
                      {/*    <NavDropdown.Item>Orders</NavDropdown.Item>*/}
                      {/*</LinkContainer>*/}
                      <LinkContainer to={'/admin/users'}>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className={'mt-3'}>
            <Routes>
              <Route path="/product/:slug" element={<ProductPage />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/signin" element={<SignInPage />}></Route>
              <Route path="/shipping" element={<ShippingAddressPage />}></Route>
              <Route path="/signup" element={<SignUpPage />}></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path={'/admin/products'}
                element={
                  <AdminRoute>
                    <ProductListPage />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path={'/admin/product/:id'}
                element={
                  <AdminRoute>
                    <ProductEditPage />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListPage />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditPage />
                  </AdminRoute>
                }
              ></Route>
              <Route path="/" element={<HomePage />}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">
            <p>© All Rights Reserved</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
