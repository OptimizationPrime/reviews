const fs = require('fs')

// const lines = 10000000 // (0 - 9999999)
// const lines = 20000000 // (10M - 19999999)
// const lines = 30000000 // (20M - 29999999)
const lines = 40000000 // (30M - 39999999)

// const filename = 'csv_files/postgres_listings/listings.csv'
// const filename = 'csv_files/postgres_listings/listings_2.csv'
// const filename = 'csv_files/postgres_listings/listings_3.csv'
const filename = 'csv_files/postgres_listings/listings_4.csv'

const stream = fs.createWriteStream(filename)

const generateListing = (index) => {
  // const neighborhoodIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const id = index
  const neighborhood_id = Math.floor(Math.random() * 500000) // Foreign Key

  return `${id},${neighborhood_id}\n`
}

const startWriting = (writeStream, encoding, done) => {
  let i = lines

  function writing () {
    let canWrite = true
    do {
      i--
      let listing = generateListing(i)
      // if (i === 0) {
      // if (i === 10000000) {
      // if (i === 20000000) {
      if (i === 30000000) {
        writeStream.write(listing, encoding, done)
      } else {
        writeStream.write(listing, encoding)
      }
    // } while (i > 0 && canWrite)
    // } while (i > 10000000 && canWrite)
    // } while (i > 20000000 && canWrite)
    } while (i > 30000000 && canWrite)
    // if(i > 0 && !canWrite){
    // if(i > 10000000 && !canWrite){
    // if(i > 20000000 && !canWrite){
    if(i > 30000000 && !canWrite){
      writeStream.once('drain', writing);
    }
  }

  writing()
}

stream.write(`id,neighborhood_id\n`, 'utf-8')
startWriting(stream, 'utf-8', () => {
  stream.end()
})

// To disable auto commit for each insertion use BEGIN at the start and  COMMIT at the end

// COPY is a single command, there is no need to disable autocommit if you use this method to populate a table.
// COPY listings(id, neighborhood_id)
// FROM '/home/octavio/neighborhood-reviews/csv_files/postgres_listings/listings.csv'
// DELIMITER ','
// CSV HEADER;
// COPY listings(id, neighborhood_id)
// FROM '/home/octavio/neighborhood-reviews/csv_files/postgres_listings/listings_2.csv'
// DELIMITER ','
// CSV HEADER;
// COPY listings(id, neighborhood_id)
// FROM '/home/octavio/neighborhood-reviews/csv_files/postgres_listings/listings_3.csv'
// DELIMITER ','
// CSV HEADER;

COPY listings(id, neighborhood_id)
FROM '/home/octavio/neighborhood-reviews/csv_files/postgres_listings/listings_4.csv'
DELIMITER ','
CSV HEADER;


// Whenever you have significantly altered the distribution of data within a table, running ANALYZE is strongly recommended. This includes bulk loading large amounts of data into the table. Running ANALYZE (or VACUUM ANALYZE) ensures that the planner has up-to-date statistics about the table. With no statistics or obsolete statistics, the planner might make poor decisions during query planning, leading to poor performance on any tables with inaccurate or nonexistent statistics.

// 40M listings
// 500K neighborhoods => average 80 listings per hood
// 20M reviews => average 40 reviews per listing
// 20M+ users