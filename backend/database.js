const mongoose = require('mongoose');




mongoose.connect( 'mongodb+srv://admin:admin@cluster0.gec34.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})


