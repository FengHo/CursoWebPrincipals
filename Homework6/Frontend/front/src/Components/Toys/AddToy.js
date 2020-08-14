import React, {Component, Fragment} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import '../Form.css'
import Alerts from "../Alerts/Alerts";

export default class AddToy extends Component {
    constructor() {
        super();

        let alreadyExists = false;
        let alreadySubmitted = false;

        if (sessionStorage.alreadyExists) {
            if (sessionStorage.getItem('alreadyExists') === 'true')
                alreadyExists = true;
            else
                alreadyExists = false;
        }
        if (sessionStorage.alreadySubmitted) {
            if (sessionStorage.getItem('alreadySubmitted') === 'true')
                alreadyExists = true;
            else
                alreadyExists = false;
        }

        this.state = {
            toy: {
                id: '',
                name: '',
                price: '',
            },
            undefinedId: false,
            undefinedName: false,
            alreadyExists: alreadyExists,
            alreadySubmitted: alreadySubmitted,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.toy.id === '')
            this.setState({undefinedId: true});
        if (this.state.toy.name === '')
            this.setState({undefinedName: true});

        let headers = new Headers();
        headers.append('Content-type', 'application/json')

        let request = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'id': this.state.toy.id,
                'name': this.state.toy.name,
                'price': this.state.toy.price,
            }),
        }

        if (this.state.toy.id !== '' && this.state.toy.name !== ''  && (this.state.toy.price === '' || (!isNaN(this.state.toy.price) && this.state.toy.price > 0))) {
            fetch("http://localhost:3000/api/addToy", request)
                .then((response) => response.json())
                .then((data) => {
                    if (JSON.stringify(data) === JSON.stringify({})) {
                        this.setState({alreadyExists: true});
                        sessionStorage.setItem('alreadyExists', 'true');
                    } else {
                        sessionStorage.setItem('alreadyExists', 'false');
                    }

                    sessionStorage.setItem('name', this.state.toy.id);
                    sessionStorage.setItem('alreadySubmitted', 'true');
                    this.setState({alreadySubmitted: true});
                }).then();
        }
    }

    reset() {
        this.setState({
            undefinedId: false,
            alreadyExists: false,
            alreadySubmitted: false
        });
    }

    submitAlerts() {
        let alertNameAlreadyExists =
            <Alerts variant="danger">
                <Alerts.Heading>Toy with ID {sessionStorage.getItem('name')} already exists</Alerts.Heading>
            </Alerts>;

        if (sessionStorage.getItem('alreadySubmitted') === 'true' && sessionStorage.getItem('alreadyExists') === 'true')
            return alertNameAlreadyExists;

        if(sessionStorage.getItem('alreadySubmitted') === 'true' && sessionStorage.getItem('alreadyExists') === 'false')
            return (<Alerts variant="success">
                <Alerts.Heading>Toy with ID {sessionStorage.getItem('name')} registered successfully!</Alerts.Heading>
            </Alerts>);
    }

    getBorderStyle = (state) => {
        if(state)
            return 'red';
        else
            return '';
    }

    getTextClassName = (state) => {
        if(state)
            return 'text-danger';
        else
            return 'text-muted';
    }


    render() {
        return (
            <div className="background-animal">
                <div className="form">
                    {this.submitAlerts()}
                    <Card className="form-container">
                        <Card.Header>Register new toy</Card.Header>
                        <Form>
                            <Form.Group>
                                <Form.Label>ID</Form.Label>
                                <Form.Control value={this.state.toy.id}
                                              onChange={e => {
                                                  this.setState({
                                                      toy: {
                                                          id: e.target.value,
                                                          name: this.state.toy.name,
                                                          price: this.state.toy.price
                                                      }
                                                  });
                                                  this.reset();
                                              }}
                                              type="text" placeholder="Enter ID"
                                              style={{borderColor: this.getBorderStyle(this.state.undefinedId)}}/>
                                <Form.Text className={this.getTextClassName(this.state.undefinedId)}>
                                    This camp needs to be filled.
                                </Form.Text>
                                {this.state.undefinedId && <Alerts type={'danger'} msg={'ID must be defined'}/>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={this.state.toy.name}
                                              onChange={e => {
                                                  this.setState({
                                                      toy: {
                                                          id: this.state.toy.id,
                                                          name: e.target.value,
                                                          price: this.state.toy.price
                                                      }
                                                  });
                                                  this.setState({undefinedName: false});
                                              }}
                                              type="text" placeholder="Enter name"
                                              style={{borderColor: this.getBorderStyle(this.state.undefinedName)}} />
                                <Form.Text className={this.getTextClassName(this.state.undefinedName)}>
                                    This camp needs to be filled.
                                </Form.Text>
                                {this.state.undefinedName && <Alerts type={'danger'} msg={'Name must be defined'}/>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control value={this.state.toy.price}
                                              onChange={e => {
                                                  this.setState({
                                                      toy: {
                                                          id: this.state.toy.id,
                                                          name: this.state.toy.name,
                                                          price: e.target.value,
                                                      }
                                                  });
                                              }}
                                              type="text" placeholder="Enter Price"
                                              style={{borderColor: this.getBorderStyle(this.state.toy.price !== '' && (isNaN(this.state.toy.price) || this.state.toy.price < 0))}}
                                />
                                {this.state.toy.price !== '' && (isNaN(this.state.toy.price) || this.state.toy.price <= 0) &&
                                <Alerts type={'danger'} msg={'Price should be a number and positive'}></Alerts>}
                            </Form.Group>
                            <div className="button-div">
                                <Button className="button" onClick={this.handleSubmit} variant="success" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>);
    }
}