import React, {useEffect} from 'react';
import {CardButton} from "../Layout/CardButton";
import "./Homepage.css"

export const Home = () => {
    useEffect(() => {
        sessionStorage.setItem('alreadyExists', 'false');
        sessionStorage.setItem('name', '');
        sessionStorage.setItem('alreadySubmitted', 'false');
        //eslint-disable-next-line
    }, [])

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

export default Home;