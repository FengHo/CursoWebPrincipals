import React, {Component} from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import '../List.css'

export default class ListAllToys extends Component {
    constructor() {
        super();

        this.state = {
            toys: []
        }
    }

    componentDidMount() {
        this.getAllAnimals();
    }

    getAllAnimals() {
        fetch('http://localhost:3000/api/allToys', {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                this.setState({toys: data});
            })
    }

    render() {
        const cards = this.state.toys.map((toy, index) =>(
            <ListGroup.Item >
                <Card className="list-item">
                    <Card.Text>ID: {toy.id}</Card.Text>
                    <Card.Text>Name: {toy.name}</Card.Text>
                    <Card.Text>Price: {toy.price}</Card.Text>
                </Card>
            </ListGroup.Item>
        ));

        return(
            <Card className='list'>
                <Card.Header style={{textAlign: 'center'}}>Toys</Card.Header>
                <ListGroup variant="flush">
                    {cards}
                </ListGroup>
            </Card>
        );
    }
}