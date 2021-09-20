const mongoose = require('mongoose');



const schema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    korisnicko_ime:{
        type: String,
        unique: true,
        trim: true
    },
    lozinka: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const Korisnik = mongoose.model('Korisnik', schema)


module.exports = Korisnik