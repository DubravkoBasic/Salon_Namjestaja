const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    naziv:{
        type: String,
        required: true,
        trim: true,
        minlength: 4,
    },
    productImage: {
        type: String,
        required: true
    },
    cijena: {
        type: Number,
        required: true
    },
    kategorija: {
        type: String,
        required: true,
        minlength: 4, 
    },
    opis: {
        type: String,
        required: true,
        minlength: 10
    },
}, {
    timestamps: true
})


const namjestaj = mongoose.model('Namjestaj', schema)


module.exports = namjestaj 