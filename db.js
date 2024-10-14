const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:5000/utp-travel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
