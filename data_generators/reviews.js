const fs = require('fs')
const faker = require('faker')
const LorenIpsum = require('lorem-ipsum').LoremIpsum;

// const lines = 5000000 // for reviews_1.csv (0-4999999)
// const lines = 10000000 // for reviews_2.csv (5M - 9999999)
// const lines = 15000000 // for reviews_3.csv (10M - 14999999)
const lines = 20000002 // for reviews_3.csv (15M - 20000001)

// const filename = 'csv_files/reviews/reviews_1.csv'
// const filename = 'csv_files/reviews/reviews_2.csv'
// const filename = 'csv_files/reviews/reviews_3.csv'
const filename = 'csv_files/reviews/reviews_4.csv'

const stream = fs.createWriteStream(filename)

// logs the time it takes to run your code in the console
console.time("Time this")

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
  // const userid = Math.floor(Math.random() * 100) // Foreign Key
  const user_id = Math.floor(Math.random() * 50000000) // Foreign Key
  // const neighborhood_id = neighborhoodIds[index % neighborhoodIds.length] // Foreign Key
  const neighborhood_id = Math.floor(Math.random() * 500000) // Foreign Key
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
      // if (i === 0) { // for reviews_1.csv (0-4999999)
      // if (i === 5000000) { // for reviews_2.csv (5M - 9999999)
      // if (i === 10000000) { // for reviews_3.csv (10M - 14999999)
      if (i === 15000000) { // for reviews_4.csv (15M - 20000001)

        writeStream.write(review, encoding, done)
      } else {
        canWrite = writeStream.write(review, encoding)
      }
    // } while (i > 0 && canWrite) // for reviews_1.csv (0-4999999)
    // } while (i > 5000000 && canWrite) // for reviews_2.csv (5M - 9999999)
    // } while (i > 10000000 && canWrite) // for reviews_3.csv (10M - 14999999)
    } while (i > 15000000 && canWrite) // for reviews_4.csv (15M - 20000001)

    // if(i > 0 && !canWrite){ // for reviews_1.csv (0-4999999)
    // if(i > 5000000 && !canWrite){ // for reviews_2.csv (5M - 9999999)
    // if(i > 10000000 && !canWrite){ // for reviews_3.csv (10M - 14999999)
    if(i > 15000000 && !canWrite){ // for reviews_4.csv (15M - 20000001)

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

console.timeEnd("Time this")

// Remove constraints when seeding, stuff like PRIMARY KEY, data types?
// Then do ALTER TABLES to add them afterwards

// explain analyze on psql gives you planning and execution times for a query
// eg -> explain analyze select * from table_name where id=1;

// COPY reviews(id, user_id, neighborhood_id, review_date, full_text, likes, community, commute)
// FROM '/home/octavio/neighborhood-reviews/csv_files/reviews/reviews_2.csv'
// DELIMITER ','
// CSV HEADER;

// 40M listings
// 500K neighborhoods => average 80 listings per hood
// 20M reviews => average 40 reviews per listing
// 50M users