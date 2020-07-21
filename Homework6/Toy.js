let mongoose = require('mongoose');

// note: your host/port number may be different!
mongoose.connect('mongodb+srv://user1:Aha@cluster0.b4yzl.mongodb.net/Teste?retryWrites=true&w=majority', {
	useNewUrlParser: true
});

let Schema = mongoose.Schema;

let toySchema = new Schema( {
	id: {type: String, required: true, unique: true},
	name: {type: String, required: true},
	price: Number
    } );


module.exports = mongoose.model('Toy', toySchema);
