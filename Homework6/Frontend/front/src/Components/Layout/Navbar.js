import React from "react";
import {Nav, Navbar as Bar} from "react-bootstrap";
import ShoppingCart from '../../Assets/shopping-cart.svg';

const Navbar = () => {
    return (
        <Bar collapseOnSelect expand="lg" bg="success">
            <Bar.Brand href="/" style={{color: "white"}}>
                PetShop
            </Bar.Brand>
            <Bar.Toggle aria-controls="responsive-navbar-nav"/>
            <Bar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/" style={{color: "white"}}>Home</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/shoppingCart" style={{color: "white"}}>
                        <img src={ShoppingCart} alt='' style={{width:'20px'}}/>
                    </Nav.Link>
                </Nav>
            </Bar.Collapse>
        </Bar>
    );
}

export default Navbar;