const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel.model');

// Create a new hotel
router.post('/hotels', async (req, res) => {
    try {
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.status(201).json(hotel);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all hotels (with optional query parameters for destination and date)
router.get('/hotels', async (req, res) => {
    const { destination, checkInDate, checkOutDate } = req.query;

    // Construct query object based on provided parameters
    const query = {};
    if (destination) {
        query.destination = destination; // Assuming your Hotel model has a destination field
    }
    if (checkInDate && checkOutDate) {
        query.availableDates = {
            $elemMatch: {
                $gte: new Date(checkInDate), 
                $lte: new Date(checkOutDate)
            }
        }; // Assuming availableDates is an array of dates in the Hotel model
    }

    try {
        const hotels = await Hotel.find(query);
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a hotel by ID
router.get('/hotels/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a hotel
router.put('/hotels/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
        res.json(hotel);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a hotel
router.delete('/hotels/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
        res.json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
