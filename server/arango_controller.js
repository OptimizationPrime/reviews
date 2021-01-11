// const arangojs = require("arangojs")
const {aql, Database} = require('arangojs');
const dbConfig = require("../config/db.js");

// var DB = new arangojs.Database({
var DB = new Database({
  url: dbConfig.url
});
DB.useDatabase(dbConfig.database);
DB.useBasicAuth(dbConfig.username, dbConfig.password);

// Collection to manage: Review
var Listings = DB.collection('listings');
var NeighList = DB.collection('neigh_list');
var Neighborhoods = DB.collection('neighborhoods');
var Reviews = DB.collection('reviews');
var Users = DB.collection('users');


exports.findListingByKey = function (key) {
  if (!key) return;
  return Listings.firstExample({_key: key});
};

exports.findNeighborhoodByKey = function (key) {
  if (!key) return;
  return Neighborhoods.firstExample({_key: key});
};

exports.findListingEdgeByKey = function (key) {
  if (!key) return;
  const from = `listings/${key}`
  return NeighList.firstExample({_from: from});
};

exports.findReviewsByTo = function (key) {
  console.log('type of key: ', key);
  if (!key) return;
  // return Reviews.firstExample({_to: key})
  var obj = {
    _key: '17214940',
    _id: 'reviews/17214940',
    _from: 'users/26091610',
    _to: 'neighborhoods/26244',
    _rev: '_bjSdD-e---',
    community: false,
    commute: false,
    full_text: 'Lorem veniam laborum Lorem et voluptate qui ad voluptate sint dolor quis est culpa commodo. Nostrud enim non labore.',
    likes: 113,
    review_date: '2/5/2017'
  }
  return obj
  // var allRevs = [];
  // Reviews.byExample({_to: key})
  //   .then((reviews) => {
  //     reviews.forEach((review => allRevs.push(review)))
  //   })
  //   .then(() => {return allRevs})


};



// Find neiguborhood stats for listing
// const getNeighborhoodStats = function (id, callback) {
//   DB.query(aql`
//   for l in listings
//     filter l._key == ${id}
//       for n in neigh_list
//         filter l._id == n._from
//           for nh in neighborhoods
//             filter nh._id == n._to
//               return nh
//   `)
//   .then(cursor => cursor.all())
//   .then(res => {
//     // console.log('res: ', res );
//     callback(null, res)})
//   .catch(err => {
//     // console.log('err: ', err );
//     callback(err);
//   })
// };

// module.exports.getNeighborhoodStats = getNeighborhoodStats;

// // Find an article by its key
// exports.findByKey = function (key) {
//   if (!key) return;
//   // Returns some document of a collection that matches the specified example. If no such document exists, null will be returned. The example has to be specified as paths and values.
//   return Review.firstExample({_key: key});
// };

// // Save a new review with title and description as required fields
// exports.create = function (review) {
//   if (!review.title || !review.description) return;

//   return Review.save(review);
// };

// // Update an existing review, the incoming object should have the _key field
// exports.update = function (review) {
//   if (!review._key) return;

//   return Review.update(review._key, review);
// };

// // Remove an existing review by its _key
// exports.remove = function (key) {
//   if (!key) return;

//   return Review.removeByKeys([key]);
// };

// // Find all articles saved so fare
// exports.findAll = function () {
//   return Review.all();
// };



// const { Database, aql } = require("arangojs");

// const db = new Database({
//   url: "http://localhost:8529",
//   databaseName: "_system",
//   auth: { username: "root", password: "root" },
// });

//   const reviews = db.collection("reviews");

// async function main() {
//   try {
//     const n_reviews = await db.query(aql`
//       FOR review IN ${reviews}
//       FILTER review._key == "0"
//       RETURN review
//     `);
//     console.log("My reviews, let me show you them:");
//     for await (const review of reviews) {
//       console.log(review.likes);
//     }
//   } catch (err) {
//     console.error(err.message);
//   }
// }

// main();


// const arangojs = require("arangojs");
// // A WAY TO CONNECT
// const Database = arangojs.Database;
// const db = new Database({
//   url: "http://localhost:8529",
//   databaseName: "_system",
//   auth: { username: "root", password: "root" },
//   precaptureStackTraces: true,
// });
// // DIFFERENT WAY TO CONNECT
// // var db = new arangojs.Database({
// //   url: "http://127.0.0.1:8529"
// // });
// // db.useDatabase("_system");
// // db.useBasicAuth("root", "root");

// var reviews = db.collection("reviews");
// // console.log('reviews', reviews)
// db.query({
//   // bind parameter exists for injecting collection names @@
//   query: "FOR r IN @@c FILTER r._key == '0' RETURN r",
//   bindVars: {c: reviews}
//   })
//   .then( function (res) {console.log("back in business...", res)} )
//   .catch(function (err) {
//     console.error('no good...', err.message);
//   })

  // query: `FOR review IN @@c
  // FILTER review._key === "0"
  // RETURN review`,


// var now = Date.now();

// db.query({
//   query: "RETURN @value",
//   bindVars: { value: now }
// })
// .then(function(cursor) {
//   return cursor.next().then(function(result) {
//     // ...
//   });
// })
//   .catch(function(err) {
//     // ...
//   });


  // Note: Starting with arangojs 6.0.0, all asynchronous functions return promises.
  // If you are using a version of Node.js older than Node.js 6.x LTS (“Boron”)
  // make sure you replace the native Promise implementation with a substitute like bluebird
  // to avoid a known memory leak in older versions of the V8 JavaScript engine.