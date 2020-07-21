let express = require('express');
let app = express();

let Animal = require('./Animal.js');
let Toy = require('./Toy.js');


app.listen(3000, () => {
	console.log('Listening on port 3000');
    });

app.use(require('body-parser').json());

app.use('/api/allToys', (req, res) => {
    Toy.find({},(err, toys) => {
        if(!err)
            res.json(toys);
        else{
            console.log(err);
            res.json({})
        }
    })
})

app.use('/api/allAnimals', (req, res) => {
    Animal.find({},(err, animals) => {
        if(!err)
            res.json(animals);
        else{
            console.log(err);
            res.json({});
        }
    })
})

app.use('/api/addPet', (req,res) => {
    let query = {};

    if(req.body.name)
        query['name'] = req.body.name;
    if(req.body.species)
        query['species'] = req.body.species;
    if(req.body.breed)
        query['breed'] = req.body.breed;
    if(req.body.gender)
        query['gender'] = req.body.gender;
    if(req.body.traits)
        query['traits'] = req.body.traits;
    if(req.body.age)
        query['age'] = req.body.age;

    if(query.name && query.species){
        let tempAnimal;

        Animal.findOne({name: query.name}, (err, animal) => {
            if(err) {
                console.log(err);
                res.json({});
            } else {
                tempAnimal = animal;
            }
        });

        if(!tempAnimal){
            let newAnimal = new Animal(query);
            newAnimal.save().then((err,doc) => {
                if(err){
                    console.log(err);
                    res.json({});
                } else {
                    console.log('here');
                    res.json({name : query.name});
                }
            });
        }
    }else{
        res.json({})
    }
} );

app.use('/api/addToy', (req,res) => {
    let query = {};

    if(req.body.id)
        query['id'] = req.body.id;
    if(req.body.name)
        query['name'] = req.body.name;
    if(req.body.price)
        query['price'] = req.body.price;

    if(query.id && query.name){
        let tempToy;

        Toy.findOne({name: query.name}, (err,toy) => {
            if(err) {
                console.log(err);
                res.json({});
            } else {
                tempToy = toy;
            }
        });

        if(!tempToy){
            let newToy = new Toy(query);
            newToy.save().then((err,doc) => {
                if(err){
                    console.log(err);
                    res.json({});
                } else {
                    res.json(query);
                }
            });
        }
    }else{
        res.json({})
    }
} );

app.use('/api/findToy', (req, res) => {
    let id;

    if(req.query.id)
        id = req.query.id;

    if(id !== undefined) {
        Toy.findOne({id: id}, (err, toy) => {
            if (!err)
                res.json(toy);
            else {
                console.log(err);
                res.json({});
            }
        });
    } else
        res.json({});
});

app.use('/api/findAnimals', (req, res) => {
    let query = {}

    if(req.query.species)
        query['species'] = req.query.species;
    if(req.query.traits)
        query['traits'] = req.query.traits;
    if(req.query.gender)
        query['gender'] = req.query.gender;

    if(Object.keys(query).length != 0) {
        Animal.find(query, (err, animals) => {
            if(!err)
                res.json(animals);
            else {
                console.log(err);
                res.json({});
            }
        });
    }
    else
        res.json({});
});

app.use('/api/animalsYoungerThan', (req, res) => {
    let age;

    if(req.query.age)
        age = req.query.age;

    if(age !== undefined){
        Animal.find({age: {$lt: age}}, (err, animals) => {
            if(!err){
                let names = [];

                if(!animals){
                    res.json({count:0, names: []})
                } else {
                    for(let index  = 0; index < animals.length; index++)
                        names.push(animals[index].name);

                    res.json({count: animals.length, names: names});
                }
            } else {
                console.log(err);
                res.json({});
            }
        } );
    } else
        res.json({});
});

app.use('/api/calculatePrice', (req, res) => {
    let idArray = [];
    let query = [];
    let total = 0;
    let response = [];

    if(req.query.id !== undefined) {
        for (let index = 0; index < req.query.id.length; index++) {
            if(req.query.id[index] !== '' && req.query.qty[index] !== '' &&
                !isNaN(req.query.qty[index]) && req.query.qty[index] > 0 ) {
                let pos = query.indexOf(req.query.id[index]);

                if(pos !== -1){
                    idArray[pos].qty += Number(req.query.qty[index]);
                }else {
                    idArray.push({
                        item: req.query.id[index],
                        qty: Number(req.query.qty[index])
                    });
                    query.push(req.query.id[index]);
                }
            }
        }
    }

    if(idArray.length !== 0){
        Toy.find({id: {$in: query}}, (err, toys) => {
            if (!err) {
                for(let ind = 0; ind < toys.length; ind++){
                        let quantity = 0;

                        for(let index1 = 0; index1 < idArray.length; index1++){
                            if(idArray[index1] !== null && idArray[index1].item === toys[ind].id){
                                quantity = idArray[index1].qty;
                                idArray[index1] = null;
                            }
                        }

                        response.push({
                            item: toys[ind].id,
                            qty: quantity,
                            subtotal: (quantity * toys[ind].price)
                        });
                        total += (quantity
                            * toys[ind].price);
                }

                if(response.length != 0) {
                    res.json({items: response, totalPrice: total});}
                else
                    res.json({})
            } else {
                console.log(err);
            }
        });
    } else
        res.json({});
});


// Please do not delete the following line; we need it for testing!
module.exports = app;