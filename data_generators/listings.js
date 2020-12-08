const fs = require('fs')
const faker = require('faker')
const argv = require('yargs').argv

const lines = argv.lines || 20
const filename = argv.output || 'csv_files/listings.csv'
const stream = fs.createWriteStream(filename)

const generateListing = (index) => {
  const neighborhoodIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const id = index
  const neighborhood_id = neighborhoodIds[index % neighborhoodIds.length] // Foreign Key

  return `${id},${neighborhood_id}\n`
}

const startWriting = (writeStream, encoding, done) => {
  let i = lines

  function writing () {
    let canWrite = true
    do {
      i--
      let listing = generateListing(i)
      if (i === 0) {
        writeStream.write(listing, encoding, done)
      } else {
        writeStream.write(listing, encoding)
      }
    } while (i > 0 && canWrite)
    if(i > 0 && !canWrite){
      writeStream.once('drain', writing);
    }
  }

  writing()
}

stream.write(`id,neighborhood_id\n`, 'utf-8')
startWriting(stream, 'utf-8', () => {
  stream.end()
})


// COPY listings(id, neighborhood_id)
// FROM '/home/octavio/neighborhood-reviews/csv_files/listings.csv'
// DELIMITER ','
// CSV HEADER;