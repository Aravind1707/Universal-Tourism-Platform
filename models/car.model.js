const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carName: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    rentalPricePerDay: {
        type: Number,
        required: true
    },
    availableCars: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
