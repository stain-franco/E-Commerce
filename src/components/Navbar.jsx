
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import SideBar from './SideBar'
import { useState } from 'react'

const NavBar = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Navbar bg="primary" variant="primary">
            <Container>
                <Navbar.Brand as={ Link } to="/" >Products</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={ Link } to="/login">Login</Nav.Link>
                    <Nav.Link as={ Link } to="/purchases">Purchases</Nav.Link>
                    <Nav.Link onClick={ handleShow }>purchases (sidebar)</Nav.Link>
                </Nav>
            </Container>
            </Navbar>
        <SideBar
        show={show}
        handleClose={handleClose}
        />
        </>
    )
}

export default NavBar;
