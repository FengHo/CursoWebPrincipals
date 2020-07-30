import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import Homepage from "./Homepage";
import AddAnimal from "./AddAnimal";
import AddToy from "./AddToy";
import ListAllAnimals from "./ListAllAnimals";
import ListAllToys from "./ListAllToys";

/*let shoppingCart = (
    <span>
        <a href="/shoppingCart">
            <svg xmlns="http://www.w3.org/2000/svg" >
                <img src = {ShoppingCart}></img>
            </svg>
        </a>
    </span>
)*/

export default class RouterNav extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navbar collapseOnSelect expand="lg" bg="success">
                    <Navbar.Brand href="/" style={{color:"white"}}>PetShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/" style={{color:"white"}}>Home</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/shoppingCart" style={{color:"white"}}>ShoppingCart</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    <Route exact path="/" component={Homepage}></Route>
                    <Route path="/newAnimal" component={AddAnimal}></Route>
                    <Route path="/newToy" component={AddToy}></Route>
                    <Route path="/searchAnimals" component={ListAllAnimals}></Route>
                    <Route path="/searchToys" component={ListAllToys}></Route>
                </Switch>
            </BrowserRouter>);
    }
}