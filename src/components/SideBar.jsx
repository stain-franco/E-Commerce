import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import getConfig from '../helpers/getConfig';

const SideBar = ({show, handleClose}) => {

    const [purchases, setPurchases] = useState([])

    useEffect( () => {
        axios
        .get("https://e-commerce-backend-uunu.onrender.com/carts", getConfig() )
        .then(resp => setPurchases(resp.data))
        .catch(error => console.log(error))
    },[show])

    const checkoutCart = () =>{
        axios
        .post("https://e-commerce-backend-uunu.onrender.com/purchases",
        {
            "quantity": 3,
            "productId": 2,
            "userId": 1
        }, getConfig())
        .then(resp => setPurchases([]))
        .catch(error => console.log(error))
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement={ "end" }>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Purchases</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            {
                purchases.length !== 0
                 ?
                 
                purchases.map(cart=>(
                    
                     <div key={cart.title} className='container-SideBar'>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Total quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{cart.product.title}</td>
                                <td>{cart.quantity}</td>
                            </tr>
                            </tbody>
                        </Table>            
                     </div>
                ))
                :
                <h2>no hay productos</h2>
            }
            <Button 
            disabled={ purchases.length === 0}
            onClick={checkoutCart}>Checkout</Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default SideBar;
