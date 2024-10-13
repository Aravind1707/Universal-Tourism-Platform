const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 5000; // Your server port

// Middleware to handle JSON data from requests
app.use(express.json());

// MongoDB connection URL and database name
const dbUri = "mongodb://localhost:27017";  // or MongoDB Atlas URI if you're using cloud MongoDB
const dbName = 'utp_travel';

let db;

// Connect to MongoDB
MongoClient.connect(dbUri, { useUnifiedTopology: true })
  .then(client => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

// API Endpoint for Search Functionality
app.get('/api/search', (req, res) => {
  const destination = req.query.destination;
  const checkIn = req.query.checkIn;
  const checkOut = req.query.checkOut;

  if (!destination || !checkIn || !checkOut) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  // Query the database to find matching hotels
  const hotelsCollection = db.collection('hotels');
  hotelsCollection.find({
    destination: destination,
    availableFrom: { $lte: checkIn },
    availableTo: { $gte: checkOut }
  }).toArray()
    .then(hotels => res.json(hotels))
    .catch(error => {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
