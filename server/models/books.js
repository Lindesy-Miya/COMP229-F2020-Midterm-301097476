let mongoose = require('mongoose');
const { clearScreenDown } = require('readline');

// create a model class
//I change 'Book' to booksModel so I don't confuse myself
let bookModel = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    author: String,
    genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', bookModel);
