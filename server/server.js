// const express = require('express');
// const path = require('path');
// const app = express();
// const bodyParser = require('body-parser');
// const controller = require('./controllers.js');
// const port = 7010;

// const db = require('../db/connection.js');

// const publicDir = path.join(__dirname, '../client/public');

// app.use(bodyParser.json());
// // app.use('/reviews/:id', express.static(publicDir));

// // app.get('*/:id/neighborhood_stats', controller.getAllStats);

// // app.get('*/:id/neighborhood_reviews', controller.getAllReviews);

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}/reviews/:id`);
// });

// // To get to a page: http://localhost:8010/reviews/1 (= window.location)
// // Postman req: http://localhost:8010/reviews/1/neighborhood_stats

// // How are the routes here different from the routes in the browser
// // how does id play into this, where is it specified that a certain id will pull up a specific set of data?
// // What does the * do?