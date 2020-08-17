import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Homepage from "../Pages/Homepage";
import AddAnimal from "../Animals/AddAnimal";
import AddToy from "../Toys/AddToy";
import ListAllAnimals from "../Animals/ListAllAnimals";
import ListAllToys from "../Toys/ListAllToys";
import Navbar from "../Layout/Navbar";

const RouterNav = () => {
    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Switch>
                <Route exact path="/" component={Homepage}></Route>
                <Route path="/newAnimal" component={AddAnimal}></Route>
                <Route path="/newToy" component={AddToy}></Route>
                <Route path="/searchAnimals" component={ListAllAnimals}></Route>
                <Route path="/searchToys" component={ListAllToys}></Route>
            </Switch>
        </BrowserRouter>);
}

export default RouterNav;