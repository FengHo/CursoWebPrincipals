let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose')
let service = require('./index.js');
let Animal = require('./Animal.js');
let Toy = require('./Toy.js');

const MONGODBURL = 'mongodb+srv://user1:Aha@cluster0.b4yzl.mongodb.net/Teste?retryWrites=true&w=majority';
const test = {
    Animal1: new Animal( {
        "name": "Jóse",
        "species": "Bird",
        "breed": "Cockatiel",
        "gender": "male",
        "traits": "funny",
        "age": 2
    }),
    Animal2: new Animal( {
        "name": "Maria",
        "species": "Bird",
        "breed": "Cockatoo",
        "gender": "female",
        "traits": "kind",
        "age": 3
    }),
    Toy1: new Toy({
        "id": "1",
        "name": "Rope Ball",
        "price": 25
    }),
    Toy2: new Toy({
        "id": "2",
        "name": "Roller coaster",
        "price": 40
    })
};

chai.use(chaiHttp);
let expect = chai.expect;
mongoose.connect(MONGODBURL, {useNewUrlParser: true});

before((done) => {
    Animal.deleteMany({});
    Toy.deleteMany({});

    test.Animal1.save().then((err, doc) => {
        if (err) {
            console.log(err);
        }
    });

    test.Animal2.save().then((err, doc) => {
        if (err) {
            console.log(err);
        }
    });



    test.Toy1.save().then((err, doc) => {
        if (err) {
            console.log(err);
        }
    });

    test.Toy2.save().then((err, doc) => {
        if (err) {
            console.log(err);
        }
    });

    done();
});

after((done) => {
    Animal.deleteMany({});
    Toy.deleteMany({});
    done();
});

describe('Test get all toys', (done) => {

    it('Should have returned all toys', async () => {
        chai.request(service)
            .get('/api/allToys')
            .end((err, res) => {
                expect(res.body.length).to.equal(2);
            })
    })
});

describe('Test get all Animals', () => {
    it('Should have returned all animals', () => {
        chai.request(service)
            .get('/api/allAnimals')
            .end((err, res) => {
                expect(res.body.length).to.equal(2);
            })
    });
});

describe('Test save new pet', () => {
    it('Should have saved the new pet', async () => {
        let animal = {
            name: "Carlitos",
            species: "Dog",
            breed: "Chihuahua",
            gender: "male",
            traits: "crazy",
            age: 4
        };

        chai.request(service)
            .post('/api/addPet').send(animal)
            .end((err, res) => {
                expect(res.body.name).to.equal('Carlitos');
                chai.request(service)
                    .get('/api/findAnimals?species=Chihuahua')
                    .end((err, res) => {
                        res.body.length.should.be(1);
                    })
            });
    });

    it('Should not create pet, critical information missing', async () => {
        let brokenAnimal = {
            name: "",
            species: "Dog",
            breed: "Chihuahua",
            gender: "male",
            traits: "crazy",
            age: 4
        }

        chai.request(service)
            .post('/api/addPet')
            .end((err, res) => {
                expect(res.body.name).to.equal(undefined);
                chai.request(service)
                    .get('/api/findAnimals?species=Dog')
                    .end((err,res) => {
                        res.body.length.should.be(0);
                    })
            });
    });

    it('Should not create another animal, same name', async () => {
        let brokenAnimal = {
            name: "Maria",
            species: "Dog",
            breed: "Chihuahua",
            gender: "female",
            traits: "crazy",
            age: 4
        }

        chai.request(service)
            .post('/api/addPet')
            .end((err, res) => {
                expect(res.body.name).to.equal(undefined);
                chai.request(service)
                    .get('/api/findAnimals?species=Dog')
                    .end((err,res) => {
                        res.body.length.should.be(0);
                    })
            });
    });
});

describe('Test to toy insert', () => {
    it('Should have saved the new toy', async () => {
        let toy = {
            id: '10',
            name: 'Rock Climbing Xtreme',
            price: 100
        };

        chai.request(service)
            .post('/api/addToy')
            .send(toy)
            .end((err, res) => {
                expect(res.body.name).to.equal('Rock Climbing Xtreme');
                chai.request(service)
                    .get('/api/findToy?id=10')
                    .end((err,res) => {
                        expect(res.body.price).to.equal(100);
                    })
            });
    });

    it('Should not create toy, critical information missing', async () => {
        let toy = {
            id: '11',
            name: '',
            price: 100
        };

        chai.request(service)
            .post('/api/addToy')
            .send(toy)
            .end((err, res) => {
                expect(res.body.name).to.equal(undefined);
                chai.request(service)
                    .get('/api/findToy?id=10')
                    .end((err,res) => {
                        expect(res.body).to.equal({});
                    })
            });
    });
});

describe('Test if find toy is working', () => {
    it('Should have returned a toy', async () => {
        chai.request(service)
            .post('/api/findToy?id=1')
            .end((err, res) => {
                expect(res.body.name).to.equal('Rope Ball');
            });
    });

    it('Should not return a toy', async () => {
        chai.request(service)
            .post('/api/findToy?id=10')
            .end((err, res) => {
                expect(res.body).to.deep.equal({});
            });
    });
});

describe('Test if find animals is working', () => {
    it('Should have returned a array with birds', async () => {
        chai.request(service)
            .get('/api/findAnimals?species=Bird')
            .end((err, res) => {
                res.body.length.should.be(2);
            });
    });

    it('Should not return an array with things, species defined', async () => {
        chai.request(service)
            .get('/api/findAnimals?species=Dog')
            .end((err, res) => {
                expect(res.body).to.deep.equal({});
            });
    });

    it('Should not return an array with things', async () => {
        chai.request(service)
            .get('/api/findAnimals?species=')
            .end((err, res) => {
                expect(res.body).to.deep.equal({});
            });
    });
});

describe('Test if find animals younger is working', () => {
    it('Should have returned a array with animals younger than 4', async () => {
        chai.request(service)
            .post('/api/animalsYoungerThan?age=4')
            .end((err, res) => {
                res.body.length.should.be(2);
            });
    });

    it('Should not return an array with things, age defined', async() => {
        chai.request(service)
            .post('/api/animalsYoungerThan?age=1')
            .end((err, res) => {
                res.body.should.be({});
            });
    });

    it('Should not return an array with things', async() => {
        chai.request(service)
            .post('/api/animalsYoungerThan?age=')
            .end((err, res) => {
                expect(res.body).to.deep.equal({});
            });
    });
});

describe('Test if calculate price works', () => {
    it('Should not return an array with things, qty defined', async () => {
        chai.request(service)
            .get('/api/calculatePrice?id[0]=&qty[0]=2')
            .end((err, res) => {
                expect(res.body).to.deep.equal({});
            });
    });

    it('Should not return an array with things, id defined', async () => {
        chai.request(service)
            .get('/api/calculatePrice?id[0]=2&qty[0]=')
            .end((err, res) => {
                expect(res.body).to.deep.equal({});
            });
    });

    it('Should return two objects only, id missing', async () => {
        chai.request(service)
            .get('/api/calculatePrice?id[0]=1&qty[0]=2&id[1]=&qty[1]=2&id[2]=2&qty[2]=1')
            .end((err, res) => {
                console.log(res.body)
                res.body.items.length.should.be(2);
                expect(res.body.totalPrice).to.equal(90);
            });
    });

    it('Should return two objects only, qty missing', async () => {
        chai.request(service)
            .get('/api/calculatePrice?id[0]=1&qty[0]=2&id[1]=2&qty[1]=&id[2]=2&qty[2]=1')
            .end((err, res) => {
                res.body.items.length.should.be(2);
                expect(res.body.totalPrice).to.equal(90);
            });
    });

    it('Should return one object only', async () => {
        chai.request(service)
            .get('/api/calculatePrice?id[0]=1&qty[0]=2&id[1]=1&qty[1]=1')
            .end((err, res) => {
                res.body.items.length.should.be(1);
                expect(res.body.totalPrice).to.equal(75);
            });
    });

    it('Should return nothing', async () => {
        chai.request(service)
            .get('/api/calculatePrice?id[0]=50&qty[0]=2')
            .end((err, res) => {
                expect(res.body).to.deep.equal({});
            });
    })
});