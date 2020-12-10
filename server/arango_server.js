const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const controller = require('./arango_controller.js');
const port = 7010;
const db = require('./arango_controller.js')
// const db = require('../db/connection.js');

const publicDir = path.join(__dirname, '../client/public');

app.use(bodyParser.json());
app.use('/listings/:id', express.static(publicDir));

app.get('/', function(req, res) {
  db
  .findAll()
  .then(function(response) {
    console.log(`Load all saved documents.`, response._result);

    return res.status(200).json(response._result);
  })
  .catch(function(error) {
    console.error('Error getting documents', error);
    return res.status(500).json(error);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/listings/:id`);
});

app.get('/reviews/:id', function(req, res) {
  var key = req.params.id;
  // console.log('user:', req.params) // {id: 1}
  db
  .findByKey(key)
  .then(function(doc) {
    console.log(`Get a document by key "${req.params.id}".`, doc._key);

    return res.status(200).json(doc);
  })
  .catch(function(error) {
    console.error('Error getting single document', error);
    return res.status(500).json(error);
  });
});

// app.get('*/:id/neighborhood_stats', controller.getAllStats);
// app.get('*/:id/neighborhood_reviews', controller.getAllReviews);

// To get to a page: http://localhost:8010/reviews/1 (= window.location)
// Postman req: http://localhost:8010/reviews/1/neighborhood_stats

// How are the routes here different from the routes in the browser
// how does id play into this, where is it specified that a certain id will pull up a specific set of data?
// What does the * do?