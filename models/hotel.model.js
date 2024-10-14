const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: String,
    description: String,
    destination: String,
    price: Number,
    availableFrom: Date,
    availableTo: Date
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
