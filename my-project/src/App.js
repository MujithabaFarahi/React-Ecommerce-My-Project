/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';


function App() {
  return (
    <BrowserRouter>
        <div className='d-flex flex-column site-container'>
            <header>
                <Navbar bg="dark" varient="light">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>React Ecommerse</Navbar.Brand>
                        </LinkContainer>
                    </Container>
                </Navbar>
            </header>
            <main>
                <Container className={"mt-3"}>
                    <Routes>
                        <Route path="/product/:slug" element={<ProductPage/>}></Route>
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
