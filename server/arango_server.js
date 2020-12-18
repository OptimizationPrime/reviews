require('newrelic');
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


// app.get('/reviews/:id', (req, res) => {
//   var key = req.params.id;
//   // console.log('user:', req.params) // {id: 1}
//   db.getNeighborhoodStats(key, (err, response) => {
//     if (err) {
//       console.log('err: ', err);
//       res.send(404);
//     } else {
//       res.send('res: ', response);
//     }
//   })
//   // .then(function(doc) {
//   //   console.log(`Get a document by key "${req.params.id}".`, doc._key);

//   //   return res.status(200).json(doc);
//   // })
//   // .catch(function(error) {
//   //   console.error('Error getting single document', error);
//   //   return res.status(500).json(error);
//   // });
// });


app.get('*/:id/neighborhood', (req, res) => {
  var key = req.params.id;
  // console.log('user:', req.params) // {id: 1}
  db
  .findListingByKey(key)
  .then(function(listing) {
    // console.log(`Get a document by key "${req.params.id}".`, doc._key);
    // console.log(`listing.neighborhood_id: ${listing.neighborhood_id}`); // neighborhood_id is a number
    console.log('listing: ', listing);
    var neighborhood_key = listing.neighborhood_id.toString(); // need a string for the key query
  // var neighborhood_key = req.params.id;
  // console.log('typeof: ', typeof(listing.neighborhood_id));
    db
    .findNeighborhoodByKey(neighborhood_key)
      .then(function(neighborhood) {
        console.log('neighborhood stats: ', neighborhood)
        res.status(200).json(neighborhood);
        // res.send(neighborhood);
        // res.end();
      })
      .catch(function(error) {
        console.log('Error in neighborhood fetch', error);
        res.status(500).json(error);
      })
  })
  .catch(function(error) {
    console.error('Error getting single document', error);
    res.status(500).json(error);
  });
});

app.get('*/:id/reviews', (req, res) => {
  var key = req.params.id;
  db
  .findListingEdgeByKey(key)
    .then(function(edge) {
      console.log('listing edge: ', edge);
      var to = edge._to;
      // console.log('to: ', to);
      // console.log('type of to: ', typeof(to));
      db
      .findReviewsByTo(to)
        .then(function(cursor) {
          console.log('cursor: ', cursor);
          res.status(200).json(cursor);
          // res.send(reviews);
        })
        .catch(function(error) {
          console.error('Error getting single document 1', error);
          res.status(500).json(error);
        });
    })
    .catch(function(error) {
      console.error('Error getting single document 2', error);
      res.status(500).json(error);
    });
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/listings/:id`);
});
// app.get('*/:id/neighborhood_stats', controller.getAllStats);
// app.get('*/:id/neighborhood_reviews', controller.getAllReviews);

// To get to a page: http://localhost:8010/reviews/1 (= window.location)
// Postman req: http://localhost:8010/reviews/1/neighborhood_stats

// How are the routes here different from the routes in the browser
// how does id play into this, where is it specified that a certain id will pull up a specific set of data?
// What does the * do?

// for l in listings
//     filter l._key == "1"
//     for n in neigh_list
//         filter l._id == n._from
//         for r in reviews
//             filter r._to == n._to
//             return r