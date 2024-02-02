import './App.css';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import {Badge, Nav, NavDropdown} from "react-bootstrap";
import {useContext} from "react";
import {Store} from "./Store";
import CartPage from "./Pages/CartPage";
import SigninPage from "./Pages/SigninPage";
import SignUpPage from "./Pages/SignUpPage";
import ShippingAddressPage from "./Pages/ShippingAddressPage";


function App() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT'});
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
    }

  return (
    <BrowserRouter>
        <div className='d-flex flex-column site-container'>
            <ToastContainer position={"bottom-center"} limit={1}/>
            <header>
                <Navbar bg="light" varient="light">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand className={'title-logo'}>React Ecommerse</Navbar.Brand>
                        </LinkContainer>
                        <Nav className={"me-auto"}>
                            <Link to={"/cart"} className={"nav-link"}>
                                Cart
                                {cart.cartItems.length > 0 && (
                                    <Badge pill bg={"danger"}>
                                        {cart.cartItems.reduce((a,c) => a + c.quantity, 0 )}
                                    </Badge>
                                )}
                            </Link>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id={"basic-nav-dropdown"}>
                                    <LinkContainer to={"/profile"}>
                                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to={"/orderhistory"}>
                                        <NavDropdown.Item>Order History</NavDropdown.Item>
                                    </LinkContainer>
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
                                <Link to={"/signin"} className={"nav-link"}>Sign In</Link>
                            )}
                        </Nav>
                    </Container>
                </Navbar>
            </header>
            <main>
                <Container className={"mt-3"}>
                    <Routes>
                        <Route path="/product/:slug" element={<ProductPage/>}></Route>
                        <Route path="/cart" element={<CartPage/>}></Route>
                        <Route path="/signin" element={<SigninPage/>}></Route>
                        <Route path="/shipping" element={<ShippingAddressPage/>}></Route>
                        <Route path="/signup" element={<SignUpPage/>}></Route>
                        <Route path="/" element={<HomePage/>}></Route>
                    </Routes>
                </Container>
            </main>
            <footer>
                <div className='text-center'>
                    All Rights Reserved
                </div>
            </footer>
        </div>
    </BrowserRouter>    
  );
}

export default App;
