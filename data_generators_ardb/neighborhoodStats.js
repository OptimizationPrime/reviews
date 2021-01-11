const fs = require('fs')
const faker = require('faker')

const lines = 10
const filename = 'csv_files/ardb_neighborhoodStats.csv'
// what is stream, what is filename?
const stream = fs.createWriteStream(filename)

// For large streams, such as millions of lines of generated data, we need to handle a case when our buffer is full and listen for the ‘drain’ event to be fired and then we can resume our writing

const generateNeighborhoodStats = (index) => {
  const neighborhoods = ['SoMA', 'Pacific Heights', 'Castro', 'Chinatown', 'Marina', 'Hayes Valley', 'Bayview', 'Mission', 'Outer Richmond', 'Noe Valley']
  const id = index
  const name = neighborhoods[index % neighborhoods.length]
  const dog_friendly = Math.random().toFixed(2);
  const grocery_stores = Math.random().toFixed(2)
  const neighbors_friendly = Math.random().toFixed(2)
  const parking_easy = Math.random().toFixed(2)
  const yard = Math.random().toFixed(2)
  const community_events = Math.random().toFixed(2)
  const sidewalks = Math.random().toFixed(2)
  const walk_night = Math.random().toFixed(2)
  const five_years = Math.random().toFixed(2)
  const kids_outside = Math.random().toFixed(2)
  const car = Math.random().toFixed(2)
  const restaurants = Math.random().toFixed(2)
  const streets = Math.random().toFixed(2)
  const holiday = Math.random().toFixed(2)
  const quiet = Math.random().toFixed(2)
  const wildlife = Math.random().toFixed(2)

  return `${id},${name},${dog_friendly},${grocery_stores},${neighbors_friendly},${parking_easy},${yard},${community_events},${sidewalks},${walk_night},${five_years},${kids_outside},${car},${restaurants},${streets},${holiday},${quiet},${wildlife}\n`
}

const startWriting = (writeStream, encoding, done) => {
  let i = lines
  function writing () {
    let canWrite = true
    do {
      i--
      let neighborhoodInfo = generateNeighborhoodStats(i)
      //check if i === 0 so we would write and call `done`
      if (i === 0) {
        // we are done so fire callback
        writeStream.write(neighborhoodInfo, encoding, done)
      } else {
        // we are not done so don't fire callback
        writeStream.write(neighborhoodInfo, encoding)
      }
      //else call write and continue looping
    } while (i > 0 && canWrite)
    if(i > 0 && !canWrite){
      //our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      writeStream.once('drain', writing);
    }
  }
  writing()
}

//write our `header` line before we invoke the loop, ie the table name?
stream.write(`id,name,dog_friendly,grocery_stores,neighbors_friendly,parking_easy,yard,community_events,sidewalks,walk_night,five_years,kids_outside,car,restaurants,streets,holiday,quiet,wildlife\n`, 'utf-8')
//invoke startWriting and pass callback
startWriting(stream, 'utf-8', () => {
  stream.end()
})


// For local db
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/neighborhoodStats.csv" --type csv --overwrite true --create-collection true --collection "neighborhoods" --translate 'id=_key' --server.database _system --server.username "root"

// For db instance from local
// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/neighborhoodStats.csv" --type csv --overwrite true --create-collection true --collection "neighborhoods" --translate 'id=_key' --server.endpoint tcp://34.221.100.86:8529 --server.database _system --server.username "root"

// For db instance from db instance
// arangoimport --file "neighborhoodStats.csv" --type csv --overwrite true --create-collection true --collection "neighborhoods" --translate 'id=_key' --server.database _system --server.username "root"

// 40M listings
// 500K neighborhoods => average 80 listings per hood
// 20M reviews => average 40 reviews per listing
// 20M+ users