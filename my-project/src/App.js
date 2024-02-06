import './App.css';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route, Link, NavLink} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import CartPage from "./Pages/CartPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import ShippingAddressPage from "./Pages/ShippingAddressPage";
import {LinkContainer} from "react-router-bootstrap";
import {Badge, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React, {useContext} from "react";
import {Store} from "./Store";
import ProfilePage from "./Pages/ProfilePage";
import ProtectedRoute from "./Components/ProtectedRoute";


function App() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT'});
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        window.location.href = '/';
    }

    return (
        <BrowserRouter>
            <div className='d-flex flex-column site-container'>
                <ToastContainer position={"bottom-center"} limit={1}/>
                <header>
                    <Navbar bg="light" variant="light" expand={"lg"}>
                        <Container>
                            <LinkContainer to="/">
                                <Navbar.Brand className={'title-logo'}>React Ecommerse</Navbar.Brand>
                            </LinkContainer>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" >
                                <Nav className="me-auto w-100 justify-content-end">
                                    <Link to={"/cart"} className={"nav-link"}>
                                        {/*<i className="fa fa-shopping-cart m-2"></i>*/}
                                        Cart
                                        {cart.cartItems.length > 0 && (
                                            <Badge pill bg={"danger"}>
                                                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                            </Badge>
                                        )}
                                    </Link>
                                    {userInfo ? (
                                        <NavDropdown title={userInfo.name} id={"basic-nav-dropdown"}>
                                            <LinkContainer to={"/profile"}>
                                                <NavDropdown.Item>User Profile</NavDropdown.Item>
                                            </LinkContainer>
                                            {/*<LinkContainer to={"/orderhistory"}>*/}
                                            {/*    <NavDropdown.Item>Order History</NavDropdown.Item>*/}
                                            {/*</LinkContainer>*/}
                                            <NavDropdown.Divider/>
                                            <Link
                                                className={"dropdown-item"}
                                                to={"#signout"}
                                                onClick={signoutHandler}
                                            >
                                                Sign Out
                                            </Link>
                                        </NavDropdown>
                                    ) : (
                                        <Link to={"/signin"} className={"nav-link"}>
                                            {/*<i className="fa fa-sign-in-alt m-2"></i>*/}
                                            Sign In
                                        </Link>
                                    )}
                                    {userInfo ? (
                                        <p></p>
                                    ) : (
                                        <Link to={"/signup"} className={"nav-link"}>
                                            {/*<i className="fa fa-user-plus m-2"></i>*/}
                                            Sign Up
                                        </Link>
                                    )}
                                    {userInfo && userInfo.isAdmin && (
                                        <NavDropdown title={"Admin"} id={"admin-nav-dropdown"}>
                                            <LinkContainer to={"/dashboard"}>
                                                <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to={"/productlist"}>
                                                <NavDropdown.Item>Products</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to={"/orderlist"}>
                                                <NavDropdown.Item>Orders</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to={"/userlist"}>
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
                    <Container className={"mt-3"}>
                        <Routes>
                            <Route path="/product/:slug" element={<ProductPage/>}></Route>
                            <Route path="/cart" element={<CartPage/>}></Route>
                            <Route path="/signin" element={<SignInPage/>}></Route>
                            <Route path="/shipping" element={<ShippingAddressPage/>}></Route>
                            <Route path="/signup" element={<SignUpPage/>}></Route>
                            <Route
                                path="/profile"
                                element={
                                <ProtectedRoute>
                                    <ProfilePage/>
                                </ProtectedRoute>}>
                            </Route>
                            <Route path="/" element={<HomePage/>}></Route>
                        </Routes>
                    </Container>
                </main>
                <footer>
                    <div className='text-center'>
                        {/*<p>*/}
                        {/*    Made with ❤️ by {" "}*/}
                        {/*    <Link to={"http://localhost:5000/api/products"}>Mujithaba Farahi</Link>*/}
                        {/*</p>*/}
                        <p>© All Rights Reserved</p>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
