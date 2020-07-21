let mongoose = require('mongoose');

// note: your host/port number may be different!
mongoose.connect('mongodb+srv://user1:Aha@cluster0.b4yzl.mongodb.net/Teste?retryWrites=true&w=majority', {
	useNewUrlParser: true
});
let Schema = mongoose.Schema;

let animalSchema = new Schema( {
	name: {type: String, required: true, unique: true},
	species: {type: String, required: true},
	breed: String,
	gender: {type: String, enum: ['male', 'female']},
	traits: [String],
	age: Number
    } );


module.exports = mongoose.model('Animal', animalSchema);
