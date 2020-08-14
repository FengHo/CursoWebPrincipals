import React, {Component} from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import '../List.css'

export default class ListAllAnimals extends Component {
    constructor() {
        super();

        this.state = {
            animals: []
        }
    }

    componentDidMount() {
        this.getAllAnimals();
    }

    getAllAnimals() {
        fetch('http://localhost:3000/api/allAnimals', {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                this.setState({animals: data});
            })
    }

    render() {
        const cards = this.state.animals.map((animal, index) =>(
            <ListGroup.Item >
                <Card className="list-item">
                    <Card.Text>Name: {animal.name}</Card.Text>
                    <Card.Text>Species: {animal.species}</Card.Text>
                    <Card.Text>Breed: {animal.breed}</Card.Text>
                    <Card.Text>Gender: {animal.gender}</Card.Text>
                    <Card.Text>Traits: {animal.traits}</Card.Text>
                    <Card.Text>Age: {animal.age}</Card.Text>
                </Card>
            </ListGroup.Item>
            ));

        return(
            <Card className='list'>
                <Card.Header style={{textAlign: 'center'}}>Animals</Card.Header>
                <ListGroup variant="flush">
                    {cards}
                </ListGroup>
            </Card>
        );
    }
}