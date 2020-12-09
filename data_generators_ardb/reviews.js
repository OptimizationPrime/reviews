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

// REVIEW GENERATOR ////////////////////////////////////////////////////////
const generateReview = (index) => {
  const neighborhoodIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const id = index
  // user id is a random # from 0 - 99
  const userid = Math.floor(Math.random() * 100) // Foreign Key
  const neighborhood_id = neighborhoodIds[index % neighborhoodIds.length] // Foreign Key
  const review_date = randomDate()
  const full_text = textGenerator.generateParagraphs(1)
  const likes = Math.floor(Math.random() * (150 - 1 + 1)) + 1
  const community = Math.random() < 0.5
  const commute = Math.random() < 0.5

  return `${id},${userid},${neighborhood_id},${review_date},${full_text},${likes},${community},${commute}\n`
}

// WRITER /////////////////////////////////////////////////////////////////
const startWriting = (writeStream, encoding, done) => {
  let i = lines
  function writing () {
    let canWrite = true
    do {
      i--
      let review = generateReview(i)
      // if (i === 0) { // for reviews_1.csv (0-3999999)
      // if (i === 4000000) { // for reviews_2.csv (4M - 7999999)
      if (i === 8000000) { // for reviews_3.csv (8M - 10000001)
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
stream.write(`id,userid,neighborhood_id,review_date,full_text,likes,community,commute\n`, 'utf-8')
startWriting(stream, 'utf-8', () => {
  stream.end()
})

// Remove constraints when seeding, stuff like PRIMARY KEY, data types?
// Then do ALTER TABLES to add them afterwards

// explain analyze on psql gives you planning and execution times for a query
// eg -> explain analyze select * from table_name where id=1;

// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/reviews_3.csv" --type csv --create-collection true --collection "reviews" --server.database _system
// —server.username "root"
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/reviews_2.csv" --type csv --collection "reviews" --server.database _system
// —server.username "root"
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/reviews_1.csv" --type csv --collection "reviews" --server.database _system
// —server.username "root"

// /home/octavio/neighborhood-reviews/csv_files/
// for edges add: --create-collection-type edge, ie arangoimp --file <path/filename> --collection <collectionName> --create-collection true --type csv --create-collection-type edge --server.database <databaseName>
// translating column names: arangoimport --file "data.csv" --type csv --translate "from=_from" --translate "to=_to"