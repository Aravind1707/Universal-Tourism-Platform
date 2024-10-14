const express = require('express');
const router = express.Router();
const Flight = require('../models/flight.model');

// Create a new flight
router.post('/flights', async (req, res) => {
    try {
        const flight = new Flight(req.body);
        await flight.save();
        res.status(201).json(flight);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all flights
router.get('/flights', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a flight by ID
router.get('/flights/:id', async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) return res.status(404).json({ error: 'Flight not found' });
        res.json(flight);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a flight
router.put('/flights/:id', async (req, res) => {
    try {
        const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!flight) return res.status(404).json({ error: 'Flight not found' });
        res.json(flight);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a flight
router.delete('/flights/:id', async (req, res) => {
    try {
        const flight = await Flight.findByIdAndDelete(req.params.id);
        if (!flight) return res.status(404).json({ error: 'Flight not found' });
        res.json({ message: 'Flight deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
