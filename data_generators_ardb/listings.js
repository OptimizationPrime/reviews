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

// COLLECTION
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/postgres_listings/listings.csv" --type csv --create-collection true --translate 'id=_key' --collection "listings" --server.database _system --server.username "root"
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/postgres_listings/listings_2.csv" --type csv --create-collection true --translate 'id=_key' --collection "listings" --server.database _system --server.username "root"
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/postgres_listings/listings_3.csv" --type csv --create-collection true --translate 'id=_key' --collection "listings" --server.database _system --server.username "root"
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/postgres_listings/listings_4.csv" --type csv --create-collection true --translate 'id=_key' --collection "listings" --server.database _system --server.username "root"

// EDGE
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/postgres_listings/listings.csv" --type csv --overwrite true --create-collection-type edge --from-collection-prefix listings --to-collection-prefix neighborhoods --collection "neigh_list"--translate "id=_from" --translate "neighborhood_id=_to" --server.database _system --server.username "root"
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/postgres_listings/listings_2.csv" --type csv --collection "neigh_list" --from-collection-prefix listings --to-collection-prefix neighborhoods --translate "id=_from" --translate "neighborhood_id=_to" --server.database _system --server.username "root"
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/postgres_listings/listings_3.csv" --type csv --collection "neigh_list" --from-collection-prefix listings --to-collection-prefix neighborhoods --translate "id=_from" --translate "neighborhood_id=_to" --server.database _system --server.username "root"
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/postgres_listings/listings_4.csv" --type csv --collection "neigh_list" --from-collection-prefix listings --to-collection-prefix neighborhoods --translate "id=_from" --translate "neighborhood_id=_to" --server.database _system --server.username "root"


// => 2020-12-10T18:04:41Z [2399] WARNING at position 20: missing '_from' or '_to' attribute, offending document: {"_from":0,"_to":0}

// --create-collection true
//  --translate "id=_key"
// --create-collection-type edge

// 40M listings
// 500K neighborhoods => average 80 listings per hood
// 20M reviews => average 40 reviews per listing
// 20M+ users