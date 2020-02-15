const mongoose = require('mongoose');
const Book = require('./book');
// ./ from our current directory

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function(next){
    Book.find({author: this.id}, (err, books) => {
        if (err) {
            next(err)
        } else if (books.length > 0){
            next(new Error('This author still have books in database'))
        } else {
            next()
        }
    })
})

//pre pozwala nam coś zrobić, zanim inna rzecz zostanie zrobiona
//w tym przykładzie, ten kod zostanie uruchomiony przed kodem z funkcją remove
module.exports = mongoose.model('Author', authorSchema)