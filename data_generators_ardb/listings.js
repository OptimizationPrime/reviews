const fs = require('fs')
const faker = require('faker')

const lines = 20
const filename = 'csv_files/ardb_listings.csv'
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

// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/listings.csv" --type csv --create-collection-type edge --create-collection true --collection "listings" --translate 'id=_key'  --server.database _system
// —server.username "root"

// --translate "id=_from" --translate "neighborhood_id=_to"