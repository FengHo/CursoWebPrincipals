import React, {Component, Fragment} from 'react';
import {Button, Card, Form, Alert} from "react-bootstrap";
import '../Form.css';
import Alerts from "../Alerts/Alerts";

export default class AddAnimal extends Component {
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
            animal: {
                name: '',
                species: '',
                breed: '',
                gender: '',
                traits: '',
                age: '',
            },
            undefinedName: false,
            undefinedSpecies: false,
            alreadyExists: alreadyExists,
            alreadySubmitted: alreadySubmitted,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

        if (this.state.animal.name === '')
            this.setState({undefinedName: true});
        if (this.state.animal.species === '')
            this.setState({undefinedSpecies: true});

        let headers = new Headers();
        headers.append('Content-type', 'application/json')

        let request = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'name': this.state.animal.name,
                'species': this.state.animal.species,
                'breed': this.state.animal.breed,
                'gender': this.state.animal.gender.toLowerCase(),
                'traits': this.state.animal.traits,
                'age': this.state.animal.age,
            }),
        }

        if (this.state.animal.name !== '' && this.state.animal.species !== '' && (this.state.animal.age === '' || (!isNaN(this.state.animal.age) && this.state.animal.age > 0))) {
            console.log('here');
            fetch("http://localhost:3000/api/addPet", request)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);

                    if (JSON.stringify(data) === JSON.stringify({})) {
                        this.setState({alreadyExists: true});
                        sessionStorage.setItem('alreadyExists', 'true');
                    } else {
                        sessionStorage.setItem('alreadyExists', 'false');
                    }

                    sessionStorage.setItem('name', this.state.animal.name);
                    sessionStorage.setItem('alreadySubmitted', 'true');
                    this.setState({alreadySubmitted: true});
                }).then(() => window.location.reload());
        }
    }

    reset() {
        this.setState({
            undefinedName: false,
            alreadyExists: false,
            alreadySubmitted: false
        });
    }

    submitAlerts() {
        let alertNameAlreadyExists =
            <Alert variant="danger">
                <Alert.Heading>Animal {sessionStorage.getItem('name')} already exists</Alert.Heading>
            </Alert>;

        if (sessionStorage.getItem('alreadySubmitted') === 'true' && sessionStorage.getItem('alreadyExists') === 'true')
            return alertNameAlreadyExists;

        if (sessionStorage.getItem('alreadySubmitted') === 'true' && sessionStorage.getItem('alreadyExists') === 'false')
            return (<Alert variant="success">
                <Alert.Heading>Animal {sessionStorage.getItem('name')} registered successfully!</Alert.Heading>
            </Alert>);
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
                        <Card.Header>Register new Animal</Card.Header>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={this.state.animal.name}
                                              onChange={e => {
                                                  this.setState({
                                                      animal: {
                                                          name: e.target.value,
                                                          species: this.state.animal.species,
                                                          breed: this.state.animal.breed,
                                                          gender: this.state.animal.gender,
                                                          traits: this.state.animal.traits,
                                                          age: this.state.animal.age,
                                                      }
                                                  });
                                                  this.reset();
                                              }}
                                              type="text" placeholder="Enter name"
                                              style={{borderColor: this.getBorderStyle(this.state.undefinedName)}}/>
                                <Form.Text className={this.getTextClassName(this.state.undefinedName)}>
                                    This camp needs to be filled.
                                </Form.Text>
                                {this.state.undefinedName && <Alerts type={'danger'} msg={'Name must be defined'}/>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Species</Form.Label>
                                <Form.Control value={this.state.animal.species}
                                              onChange={e => {
                                                  this.setState({
                                                      animal: {
                                                          name: this.state.animal.name,
                                                          species: e.target.value,
                                                          breed: this.state.animal.breed,
                                                          gender: this.state.animal.gender,
                                                          traits: this.state.animal.traits,
                                                          age: this.state.animal.age,
                                                      }
                                                  });
                                                  this.setState({undefinedSpecies: false})
                                              }}
                                              type="text" placeholder="Enter Species"
                                              style={{borderColor: this.getBorderStyle(this.state.undefinedSpecies)}}/>
                                <Form.Text className={this.getTextClassName(this.state.undefinedSpecies)}>
                                    This camp needs to be filled.
                                </Form.Text>
                                {this.state.undefinedSpecies && <Alerts type={'danger'} msg={'Species must be defined'}/>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Breed</Form.Label>
                                <Form.Control value={this.state.animal.breed}
                                              onChange={e => this.setState({
                                                  animal: {
                                                      name: this.state.animal.name,
                                                      species: this.state.animal.species,
                                                      breed: e.target.value,
                                                      gender: this.state.animal.gender,
                                                      traits: this.state.animal.traits,
                                                      age: this.state.animal.age,
                                                  }
                                              })} type="text"
                                              placeholder="Enter breed"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    id="inlineFormCustomSelect"
                                    custom
                                    value={this.state.animal.gender} onChange={e => this.setState({
                                    animal: {
                                        name: this.state.animal.name,
                                        species: this.state.animal.species,
                                        breed: this.state.animal.breed,
                                        gender: e.target.value,
                                        traits: this.state.animal.traits,
                                        age: this.state.animal.age,
                                    }
                                })}
                                >
                                    <option value={null}>Choose...</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Traits</Form.Label>
                                <Form.Control value={this.state.animal.traits}
                                              onChange={e => this.setState({
                                                  animal: {
                                                      name: this.state.animal.name,
                                                      species: this.state.animal.species,
                                                      breed: this.state.animal.breed,
                                                      gender: this.state.animal.gender,
                                                      traits: e.target.value,
                                                      age: this.state.animal.age,
                                                  }
                                              })} type="text"
                                              placeholder="Enter traits"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Age</Form.Label>
                                <Form.Control value={this.state.animal.age}
                                              onChange={e => this.setState({
                                                  animal: {
                                                      name: this.state.animal.name,
                                                      species: this.state.animal.species,
                                                      breed: this.state.animal.breed,
                                                      gender: this.state.animal.gender,
                                                      traits: this.state.animal.traits,
                                                      age: e.target.value,
                                                  }
                                              })} type="text"
                                              placeholder="Enter age"/>
                                {this.state.animal.age !== '' && (isNaN(this.state.animal.age) || this.state.animal.age <= 0) &&
                                <Alerts type={'danger'} msg={'Age should be a number and positive'}></Alerts>}
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