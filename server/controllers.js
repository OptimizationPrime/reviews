// const db = require('../db/connection.js');

// module.exports = {
//   getAllStats: (req, res) => {
//     var id = req.params.id;
//     console.log('id', id);
//     db.connection.query('Select * from neighborhoods where id = (Select neighborhood_id from listings where listings.id = ?)', [id], (err, result) => {
//       if (err) {
//         console.log('getAllStats error', err);
//         res.status(404).json(err);
//       } else {
//         console.log('getAllStats success');
//         var formattedResultArr = [];
//         for (var i = 0; i < result.length; i++) {
//           var resultObj = {
//             id: result[i].id,
//             name: result[i].name,
//             stats: {
//               'dog_friendly': result[i].dog_friendly,
//               'grocery_stores': result[i].grocery_stores,
//               'neighbors_friendly': result[i].neighbors_friendly,
//               'parking_easy': result[i].parking_easy,
//               yard: result[i].yard,
//               'community_events': result[i].community_events,
//               sidewalks: result[i].sidewalks,
//               'walk_night': result[i].walk_night,
//               'five_years': result[i].five_years,
//               'kids_outside': result[i].kids_outside,
//               car: result[i].car,
//               restaurants: result[i].restaurants,
//               streets: result[i].streets,
//               holiday: result[i].holiday,
//               quiet: result[i].quiet,
//               wildlife: result[i].wildlife,
//             }
//           };
//           formattedResultArr.push(resultObj);
//         }
//         res.status(200).json(formattedResultArr);
//       }
//     });
//   },
//   getAllReviews: (req, res) => {
//     var id = req.params.id;
//     var category = req.query.category;
//     var query = 'SELECT * FROM reviews INNER JOIN users ON reviews.userid = users.id WHERE reviews.neighborhood_id = (SELECT neighborhood_id FROM listings WHERE listings.id = ?)';
//     if (category === 'parent') {
//       query += ' AND users.parent = 1';
//     } else if (category === 'dog_owner') {
//       query += ' AND users.dog_owner = 1';
//     } else if (category === 'community') {
//       query += ' AND reviews.community = 1';
//     } else if (category === 'commute') {
//       query += ' AND reviews.commute = 1';
//     }

//     db.connection.query(query, [id], (err, result) => {
//       if (err) {
//         console.log('getAllReviews error', err);
//         res.status(404).json(err);
//       } else {
//         console.log('getAllReviews success');
//         // var result = JSON.parse(result);
//         console.log('result', result);
//         var formattedResultArr = [];
//         for (var i = 0; i < result.length; i++) {
//           var resultObj = {
//             username: result[i].name,
//             'user_type': result[i].user_type,
//             'review_date': result[i].review_date,
//             'full_text': result[i].full_text,
//             likes: result[i].likes,
//             category: {
//               parent: result[i].parent === 1 ? true : false,
//               commute: result[i].commute === 1 ? true : false,
//               'dog_owner': result[i].dog_owner === 1 ? true : false,
//               'community': result[i].community === 1 ? true : false,
//             }
//           };
//           formattedResultArr.push(resultObj);
//         }
//         // console.log('resultObj', resultObj);
//         res.status(200).json(formattedResultArr);
//       }
//     });
//   },

// };

// explain analyze SELECT * FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE reviews.neighborhood_id = (SELECT neighborhood_id FROM listings WHERE listings.id = 343434);

// CREATE INDEX reviews_neighborhood_user_idx ON reviews (user_id , neighborhood_id)
// Create listings_neighborhood_id_idx ON listings (neighborhood_id)
// SELECT * FROM reviews WHERE

// (SELECT neighborhood_id FROM listings WHERE listings.id = ?) -> one constant time lookup ?? would it be worth indexing the listing.id? make an index with id and neighborhood id for listings. This query is already super fast.

// INNER JOIN ON reviews.user_id = users.id -> not much I can do here I don't think ? EXCEPT!!! there'll be ma

// reviews.neighborhood_id = -> THere'll be many reviews with that neighborhood_id so it'd be good to have an index on this ? instead of iterating over reviews and checking all the neihgborhood_ids, it would just check the index. Foreing key is in reviews so that I don't have to nest reviews in neihgborhood


//DOWNSIDES TO MULTI-INDEX COLUMNS
// Whenever the additional column is updated, the index now needs an update, too, which might add cost to write operations and create more index bloat.
// HOT updates (Heap Only Tuple) on the table are not possible while any index column is involved.

//DOWNSIDE TO INDICES
// They take space

// WHAT IS EXPLAIN ANALYZE?
// When using EXPLAIN for tuning, I recommend always using the ANALYZE option (EXPLAIN ANALYZE) as it gives you more accurate results. The ANALYZE option actually executes the statement (rather than just estimating it) and then explains it.

// Need the reviews where _to is neighborhood_id for the listing.id
// first get the neighborhood id
  // look a the _to for that listing edge _from (_from = id)
  // or look at neighborhood_id for that listing_key (_key = id)
// get the reviews from the neighborhood id
  // look get all the reviews where _to = id

  // for review in reviews
  // filter review._to == "neighborhoods/26244"
  // return review => 29 reviews

  // Let id = (
    //   for listing in listings
    //       filter listing._key == "1"
    //       return listing.neighborhood_id
    // ) => [ 26244 ]
