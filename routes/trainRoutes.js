const express = require('express');
const router = express.Router();
const Train = require('../models/train.model');

// Create a new train
router.post('/trains', async (req, res) => {
    try {
        const train = new Train(req.body);
        await train.save();
        res.status(201).json(train);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all trains
router.get('/trains', async (req, res) => {
    try {
        const trains = await Train.find();
        res.json(trains);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a train by ID
router.get('/trains/:id', async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) return res.status(404).json({ error: 'Train not found' });
        res.json(train);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a train
router.put('/trains/:id', async (req, res) => {
    try {
        const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!train) return res.status(404).json({ error: 'Train not found' });
        res.json(train);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a train
router.delete('/trains/:id', async (req, res) => {
    try {
        const train = await Train.findByIdAndDelete(req.params.id);
        if (!train) return res.status(404).json({ error: 'Train not found' });
        res.json({ message: 'Train deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
