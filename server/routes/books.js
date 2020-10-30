// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
//connect to our Book Model
let Book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  Book.find( (err, bookList) => {
    if (err) {
      return console.error(err);
    }
    else {
     
      //console.log(BookList);
      /* res.render('books/index', {
        title: 'Books',
        books: books
      });*/

      res.render('books/index', {title: 'Book List', BookList: bookList});
    }
  });

});

//  GET the Book Details page in order to ADD a new Book -CREATE
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    res.render('books/details', {title: 'Add Book'});

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let newBook = Book({
      "title": req.body.title,
      "description": req.body.description,
      "price": req.body.price,
      "author": req.body.author,
      "genre":req.body.genre
    });

    Book.create(newBook, (err, Book) =>{
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        //refresh the page
        res.redirect('/books');
      }
    });

});

// GET the Book Details page in order to EDIT an existing Book - UPDATE
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('books/edit',{title: 'Edit Book', book: bookToEdit}) //book not sure
        }
    });
});

// POST - EDIT PAGE -process the information passed from the details form and update the document - UPDATE
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id

    let updateBook = Book({
      "_id": id, //find the bookid and rewrite it
      "title": req.body.title,
      "description": req.body.description,
      "price": req.body.price,
      "author": req.body.author,
      "genre":req.body.genre
    });

    Book.updateOne({_id: id}, updateBook, (err) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        //refresh page again
        res.redirect('/books');
      }
    })

});

// GET - process the DELETE by user id -DELETE
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    
    Book.remove({_id: id}, (err) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        res.redirect('/books');
      }
    });
});


module.exports = router;
