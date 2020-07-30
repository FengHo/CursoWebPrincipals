import React, {Component, Fragment} from 'react';
import {Alert, Button, Card, Form} from "react-bootstrap";
import './Form.css'

export default class AddToy extends Component {
    constructor() {
        super();

        let alreadyExists = false;
        let alreadySubmitted = false;

        if(sessionStorage.alreadyExists) {
            if (sessionStorage.getItem('alreadyExists') === 'true')
                alreadyExists = true;
            else
                alreadyExists = false;
        }
        if(sessionStorage.alreadySubmitted) {
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
            undefinedId:false,
            undefinedName: false,
            alreadyExists: alreadyExists,
            alreadySubmitted: alreadySubmitted,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.state.toy.id === '')
            this.setState({undefinedName: true});
        if(this.state.toy.name === '')
            this.setState({undefinedSpecies: true});

        let headers = new Headers();
        headers.append('Content-type','application/json')

        let request = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'id': this.state.toy.id,
                'name': this.state.toy.name,
                'price': this.state.toy.price,
            }),
        }

        if(this.state.toy.id !== '' && this.state.toy.name !== '' && (this.state.toy.price === '' || !isNaN(this.state.toy.price))){
            fetch("http://localhost:3000/api/addToy",request)
                .then((response) => response.json())
                .then((data) => {
                    if(JSON.stringify(data)===JSON.stringify({})) {
                        this.setState({alreadyExists: true});
                        sessionStorage.setItem('alreadyExists','true');
                    } else {
                        sessionStorage.setItem('alreadyExists','false');
                    }

                    sessionStorage.setItem('name', this.state.toy.id);
                    sessionStorage.setItem('alreadySubmitted', 'true');
                    this.setState({alreadySubmitted: true});
                }).then(() => window.location.reload());
        }
    }

    reset() {
        this.setState({
            undefinedId: false,
            alreadyExists: false,
            alreadySubmitted: false
        });
    }

    alerts(){
        if(this.state.toy.price !== '' && isNaN(this.state.toy.price)) {
            return(
                <Alert variant="danger">
                    <Alert.Heading>Price should be a number</Alert.Heading>
                </Alert>
            );
        }
    }

    submitAlerts() {
        let alertId =
            <Alert variant="danger">
                <Alert.Heading>Id must be defined</Alert.Heading>
            </Alert>;
        let alertName =
            <Alert variant="danger">
                <Alert.Heading>Name must be defined</Alert.Heading>
            </Alert>;
        let alertNameAlreadyExists =
            <Alert variant="danger">
                <Alert.Heading>Toy with ID {sessionStorage.getItem('name')} already exists</Alert.Heading>
            </Alert>;

        if(this.state.undefinedId === true) {
            if (this.state.undefinedName === true)
                return (<div>
                    {alertId}
                    {alertName}
                </div>);
            return alertId;
        }

        if (this.state.undefinedName === true)
            return alertName;

        if (sessionStorage.getItem('alreadySubmitted') === 'true' && sessionStorage.getItem('alreadyExists') === 'true')
            return alertNameAlreadyExists;

        if(sessionStorage.getItem('alreadySubmitted') === 'true' && sessionStorage.getItem('alreadyExists') === 'false')
            return (<Alert variant="success">
                <Alert.Heading>Toy with ID {sessionStorage.getItem('name')} registered successfully!</Alert.Heading>
            </Alert>);
    }


    render() {
        return (
            <Fragment>
                <div className="form">
                    <Card className="form-container">
                        <Card.Header>Register new toy</Card.Header>
                        <Form>
                            <Form.Group>
                                <Form.Label>ID</Form.Label>
                                <Form.Control value={this.state.toy.id}
                                              onChange={e => {this.setState({toy: {
                                                      id: e.target.value,
                                                      name: this.state.toy.name,
                                                      price: this.state.toy.price
                                                  }});
                                                  this.reset();}}
                                              type="text" placeholder="Enter ID"/>
                                <Form.Text className="text-muted">
                                    This is camp needs to be filled.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={this.state.toy.name}
                                              onChange={e => {this.setState({toy: {
                                                      id: this.state.toy.id,
                                                      name: e.target.value,
                                                      price: this.state.toy.price
                                                  }});
                                                  this.setState({undefinedName: false});}}
                                              type="text" placeholder="Enter name"/>
                                <Form.Text className="text-muted">
                                    This is camp needs to be filled.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control value={this.state.toy.price}
                                              onChange={e => {this.setState({toy: {
                                                      id: this.state.toy.id,
                                                      name: this.state.toy.name,
                                                      price: e.target.value,
                                                  }});}}
                                              type="text" placeholder="Enter Price"/>
                            </Form.Group>
                            <div className="button-div">
                                <Button className="button" onClick={this.handleSubmit} variant="success" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </div>
                <div>
                    {this.submitAlerts()}
                    {this.alerts()}
                </div>
            </Fragment>);
    }
}