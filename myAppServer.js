/*These are the needed libraries*/
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ejs = require("ejs");

const myAppServer =  express();

myAppServer.use(express.static("public") );

//1. Connecting to our db
mongoose.set('strictQuery', false);
const mongoDB = "mongodb+srv://your_username:your_password@cluster0.myxqth0.mongodb.net/your_DB"
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}


//2. Creating bookSchema
const bookSchema = {
    title : String,
    description : String
};
//3. creating Book model
const Book = mongoose.model( "Book", bookSchema);


//4. bodyParser is needed to pass our data
myAppServer.use(bodyParser.urlencoded({ extended:true}));
/*****************************************************************
 *  // Best option from Express Reference Documentation
 *  - app.route("/url").get().post().delete() -
 *
 *
 *  Implementation:

 app.route("/books")

 .get( (req, res)=> {
    Book.find( function (err, searchedBooks){
       if(!err ){
           res.send( searchedBooks);
       } else{
           res.send( err)
       }
    });
})

 .post( (req,res)=>{
    const newBook = new Book({
        title:req.body.title,
        description: req.body.description
    });

    newBook.save( function(err){
        if(!err){
            res.send("Added Successfully ! ")
        } else {
            res.send(err);
        }
    });
})

 .delete( (req,res)=>{
 Book.deleteMany( function(err){
     if (!err){
         res.send("All data have been deleted successfully")
     } else {
         res.send( err)
     }
 });

});
 *********************************************************************/


/***
* Implementing get() Method
***********************************/

myAppServer.get("/books", (req, res)=> {

    Book.find( function (err, searchedBooks){
       if(!err ){
           res.send( searchedBooks);
       } else{
           res.send( err)
       }

    });
});

/***
 * Implementing post() Method
 ***********************************/

myAppServer.post("/books", (req,res)=>{


    const newBook = new Book({
        title:req.body.title,
        description: req.body.description
    });

    newBook.save( function(err){
        if(!err){
            res.send("Added Successfully ! ")
        } else {
            res.send(err);
        }
    });
});

/***
 * Implementing delete() Method
 ***********************************/


myAppServer.delete("/books", (req,res)=>{


 Book.deleteMany( function(err){
     if (!err){
         res.send("All data have been deleted successfully")
     } else {
         res.send( err)
     }
 });

});


//5. needed for template engine
myAppServer.set('view engine', 'ejs');



myAppServer.listen(5000, ()=>{
    console.log( " myAppServer is running on port 5000");
});

// NB: I used arrow function instead of anonymous function
