const fs = require('fs')
const faker = require('faker')

// TODO: Install yargs? don't know what yargs figure out what argv.lines is

// const lines = 5000000 // for users_1.csv (0-4999999)
// const lines = 10000000 // for users_2.csv (5M - 9999999)
// const lines = 15000000 // for users_3.csv (10M - 14999999)
// const lines = 20000000 // for users_4.csv (15M - 19999999)
// const lines = 25000000 // for users_5.csv (20M - 24999999)
// const lines = 30000000 // for users_6.csv (25M - 29999999)
// const lines = 35000000 // for users_7.csv (30M - 34999999)
// const lines = 40000000 // for users_8.csv (35M - 39999999)
// const lines = 45000000 // for users_9.csv (40M - 44999999)
const lines = 50000002 // for users_10.csv (45M - 50000001)

// const filename = 'csv_files/users/users_1.csv'
// const filename = 'csv_files/users/users_2.csv'
// const filename = 'csv_files/users/users_3.csv'
// const filename = 'csv_files/users/users_4.csv'
// const filename = 'csv_files/users/users_5.csv'
// const filename = 'csv_files/users/users_6.csv'
// const filename = 'csv_files/users/users_7.csv'
// const filename = 'csv_files/users/users_8.csv'
// const filename = 'csv_files/users/users_9.csv'
const filename = 'csv_files/users/users_10.csv'

const stream = fs.createWriteStream(filename)

// generate one user
const generateUser = (index) => {
  // const usernames = ['Charlie', 'Tommy', 'Arthur', 'Carlos', 'Maria', 'Hugh', 'Bailey', 'Myrna', 'Oskar', 'Nelson']
  const id = index
  // const name = usernames[index % usernames.length]
  const name = faker.name.findName()
  const user_type = 'Resident'
  const dog_owner = Math.random() < 0.5
  const parent = Math.random() < 0.5
  return `${id},${name},${user_type},${dog_owner},${parent}\n`
}

const startWriting = (writeStream, encoding, done) => {
  let i = lines
  function writing () {
    let canWrite = true
    do {
      i--
      let user = generateUser(i)
      // if (i === 0) { // for users_1.csv (0-4999999)
      // if (i === 5000000) { // for users_2.csv (5M - 9999999)
      // if (i === 10000000) { // for users_3.csv (10M - 14999999)
      // if (i === 15000000) { // for users_4.csv (15M - 19999999)
      // if (i === 20000000) { // for users_5.csv (20M - 24999999)
      // if (i === 25000000) { // for users_6.csv (25M - 29999999)
      // if (i === 30000000) { // for users_7.csv (30M - 34999999)
      // if (i === 35000000) { // for users_8.csv (35M - 39999999)
      // if (i === 40000000) { // for users_9.csv (40M - 44999999)
      if (i === 45000000) { // for users_10.csv (45M - 50000001)

        writeStream.write(user, encoding, done)
      } else {
        writeStream.write(user, encoding)
      }
    // } while (i > 0 && canWrite) // for users_1.csv (0-4999999)
    // } while (i > 5000000 && canWrite) // for users_2.csv (5M - 9999999)
    // } while (i > 10000000 && canWrite) // for users_3.csv (10M - 14999999)
    // } while (i > 15000000 && canWrite) // for users_4.csv (15M - 19999999)
    // } while (i > 20000000 && canWrite) // for users_5.csv (20M - 24999999)
    // } while (i > 25000000 && canWrite) // for users_6.csv (25M - 29999999)
    // } while (i > 30000000 && canWrite) // for users_7.csv (30M - 34999999)
    // } while (i > 35000000 && canWrite) // for users_8.csv (35M - 39999999)
    // } while (i > 40000000 && canWrite) // for users_9.csv (40M - 44999999)
    } while (i > 45000000 && canWrite) // for users_10.csv (45M - 50000001)

    // if(i > 0 && !canWrite){ // for users_1.csv (0-4999999)
    // if(i > 5000000 && !canWrite){ // for users_2.csv (5M - 9999999)
    // if(i > 10000000 && !canWrite){ // for users_3.csv (10M - 14999999)
    // if(i > 15000000 && !canWrite){ // for users_4.csv (15M - 19999999)
    // if(i > 20000000 && !canWrite){ // for users_5.csv (20M - 24999999)
    // if(i > 25000000 && !canWrite){ // for users_6.csv (25M - 29999999)
    // if(i > 30000000 && !canWrite){ // for users_7.csv (30M - 34999999)
    // if(i > 35000000 && !canWrite){ // for users_8.csv (35M - 39999999)
    // if(i > 40000000 && !canWrite){ // for users_9.csv (40M - 44999999)
    if(i > 45000000 && !canWrite){ // for users_10.csv (45M - 50000001)

      writeStream.once('drain', writing);
    }
  }
  writing()
}

stream.write(`id,name,user_type,dog_owner,parent\n`, 'utf-8')
startWriting(stream, 'utf-8', () => {
  stream.end()
})

// COPY users(id, name, user_type, dog_owner, parent)
// FROM '/home/octavio/neighborhood-reviews/csv_files/users/users_1.csv'
// DELIMITER ','
// CSV HEADER;
// COPY users(id, name, user_type, dog_owner, parent)
// FROM '/home/octavio/neighborhood-reviews/csv_files/users/users_2.csv'
// DELIMITER ','
// CSV HEADER;


// 40M listings
// 500K neighborhoods => average 80 listings per hood
// 20M reviews => average 40 reviews per listing
// 20M+ users