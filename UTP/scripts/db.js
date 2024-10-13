// db.js
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'utp-travel';
const collectionName = 'users';

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    db.createCollection(collectionName, function(err, collection) {
      if (err) {
        console.log(err);
      } else {
        console.log('Collection created');
      }
    });
  }
});