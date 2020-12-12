const fs = require('fs')
const faker = require('faker')
const LorenIpsum = require('lorem-ipsum').LoremIpsum;

// const lines = 8000000// for reviews_1.csv (0-3999999)
// const lines = 8000000 // for reviews_2.csv (4M - 7999999)
const lines = 10000002 // for reviews_3.csv (8M - 10000001)

// const filename = 'csv_files/ardb_reviews_1.csv'
// const filename = 'csv_files/ardb_reviews_2.csv'
const filename = 'csv_files/ardb_reviews_3.csv'

const stream = fs.createWriteStream(filename)

// HELPERS /////////////////////////////////////////////////////////////////
const randomDate = function () {
  var start = new Date(2015, 0, 1);
  var end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString('en-US');
};

const textGenerator = new LorenIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 2,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

// want no more than 70 reviews per hood 10M listings 50M rev 50M users 250,000 neighs
// REVIEW GENERATOR ////////////////////////////////////////////////////////
const generateReview = (index) => {
  const neighborhoodIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const id = index
  // user id is a random # from 0 - 99
  // const user_id = Math.floor(Math.random() * 100) // Foreign Key
  const user_id = index // Foreign Key
  // const neighborhood_id = neighborhoodIds[index % neighborhoodIds.length] // Foreign Key
  const neighborhood_id = Math.floor(Math.random() * 250000) // Foreign Key
  const review_date = randomDate()
  const full_text = textGenerator.generateParagraphs(1)
  const likes = Math.floor(Math.random() * (150 - 1 + 1)) + 1
  const community = Math.random() < 0.5
  const commute = Math.random() < 0.5

  return `${id},${user_id},${neighborhood_id},${review_date},${full_text},${likes},${community},${commute}\n`
}

// WRITER /////////////////////////////////////////////////////////////////
const startWriting = (writeStream, encoding, done) => {
  let i = lines
  function writing () {
    let canWrite = true
    do {
      i--
      let review = generateReview(i)
      // if (i === 0) {
        // for reviews_1.csv (0-3999999)
      // if (i === 4000000) {
        // for reviews_2.csv (4M - 7999999)
      if (i === 8000000) {
        // for reviews_3.csv (8M - 10000001)
        writeStream.write(review, encoding, done)
      } else {
        canWrite = writeStream.write(review, encoding)
      }
    // } while (i > 0 && canWrite) // for reviews_1.csv (0-3999999)
    // } while (i > 4000000 && canWrite) // for reviews_2.csv (4M - 7999999)
    } while (i > 8000000 && canWrite) // for reviews_3.csv (8M - 10000001)
    // if(i > 0 && !canWrite){ // for reviews_1.csv (0-3999999)
    // if(i > 4000000 && !canWrite){ // for reviews_2.csv (4M - 7999999)
    if(i > 8000000 && !canWrite){ // for reviews_3.csv (8M - 10000001)
      writeStream.once('drain', writing);
    }
  }
  writing()
}

// WRITE CALL //////////////////////////////////////////////////////////////
stream.write(`id,user_id,neighborhood_id,review_date,full_text,likes,community,commute\n`, 'utf-8')
startWriting(stream, 'utf-8', () => {
  stream.end()
})

// Remove constraints when seeding, stuff like PRIMARY KEY, data types?
// Then do ALTER TABLES to add them afterwards

// COLLECTION
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/reviews_3.csv" --type csv --create-collection true --collection "reviews" --translate 'id=_key' --server.database _system
// —server.username "root"
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/reviews_2.csv" --type csv --collection "reviews" --translate 'id=_key' --server.database _system
// —server.username "root"
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/reviews_1.csv" --type csv --collection "reviews" --translate 'id=_key' --server.database _system
// —server.username "root"

// EDGE
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/reviews/reviews_1.csv" --type csv --create-collection-type edge --overwrite true  --collection "reviews" --from-collection-prefix users --to-collection-prefix neighborhoods --translate "user_id=_from" --translate "neighborhood_id=_to" --translate 'id=_key' --server.database _system --server.username "root"
// --create-collection-type edge
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/reviews/reviews_2.csv" --type csv --collection "reviews" --from-collection-prefix users --to-collection-prefix neighborhoods --translate "user_id=_from" --translate "neighborhood_id=_to" --translate 'id=_key' --server.database _system --server.username "root"

// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/reviews/reviews_3.csv" --type csv --create-collection-type edge  --collection "reviews" --from-collection-prefix users --to-collection-prefix neighborhoods --translate "user_id=_from" --translate "neighborhood_id=_to" --translate 'id=_key' --server.database _system --server.username "root"

// 40M listings
// 500K neighborhoods => average 80 listings per hood
// 20M reviews => average 40 reviews per listing
// 20M+ users


