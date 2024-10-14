const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const hotelRoutes = require('./routes/hotelRoutes');
const flightRoutes = require('./routes/flightRoutes');
const carRoutes = require('./routes/carRoutes');
const trainRoutes = require('./routes/trainRoutes');
const userRoutes = require('./routes/userRoutes');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views'))); // Serve HTML files from views
app.use('/css', express.static(path.join(__dirname, 'css'))); // Serve CSS files
app.use('/js', express.static(path.join(__dirname, 'js'))); // Serve JS files
app.use('/assets', express.static(path.join(__dirname, 'assets'))); // Serve assets

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/utp-travel')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// API routes
app.use('/api/hotels', hotelRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/users', userRoutes);

// Example API endpoint to fetch hotels based on a query
app.get('/api/search/hotels', async (req, res) => {
    const { destination, startDate, endDate } = req.query;
    try {
        const hotels = await Hotel.find({ 
            location: destination, 
            availableDates: { $gte: new Date(startDate), $lte: new Date(endDate) } 
        });
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Example API endpoint to fetch flights based on a query
app.get('/api/search/flights', async (req, res) => {
    const { from, to, travelDate } = req.query;
    try {
        const flights = await Flight.find({ 
            departure: from, 
            destination: to, 
            date: new Date(travelDate) 
        });
        res.json(flights);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Example API endpoint to fetch cars based on a query
app.get('/api/search/cars', async (req, res) => {
    const { location, startDate, endDate } = req.query;
    try {
        const cars = await Car.find({ 
            location: location, 
            availableDates: { $gte: new Date(startDate), $lte: new Date(endDate) } 
        });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Example API endpoint to fetch trains based on a query
app.get('/api/search/trains', async (req, res) => {
    const { from, to, travelDate } = req.query;
    try {
        const trains = await Train.find({ 
            departure: from, 
            destination: to, 
            date: new Date(travelDate) 
        });
        res.json(trains);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/homepage.html`);
});
