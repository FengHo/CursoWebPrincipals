import React, {Component} from 'react';
import {CardButton} from "../Layout/CardButton";
import "./Homepage.css"

export default class Home extends Component {
    constructor() {
        super();

        sessionStorage.setItem('alreadyExists', 'false');
        sessionStorage.setItem('name', '');
        sessionStorage.setItem('alreadySubmitted', 'false');
    }

    render() {
        return (
            <div className="background-home">
                <div className="container">
                    <CardButton className="container-item" text='Add new Animal' link='newAnimal'></CardButton>
                    <CardButton className="container-item" text='Add new Toy' link='newToy'></CardButton>
                    <CardButton className="container-item" text='Search Animals' link='searchAnimals'></CardButton>
                    <CardButton className="container-item" text='Search Toys' link='searchToys'></CardButton>
                </div>
            </div>
        )
    }
}