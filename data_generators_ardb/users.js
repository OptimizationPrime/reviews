const fs = require('fs')
const faker = require('faker')
const argv = require('yargs').argv

// TODO: Install yargs, figure out what argv.lines is

const lines = 100
const filename = 'csv_files/ardb_users.csv'
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
      if (i === 0) {
        writeStream.write(user, encoding, done)
      } else {
        writeStream.write(user, encoding)
      }
    } while (i > 0 && canWrite)
    if(i > 0 && !canWrite){
      writeStream.once('drain', writing);
    }
  }
  writing()
}

stream.write(`id,name,user_type,dog_owner,parent\n`, 'utf-8')
startWriting(stream, 'utf-8', () => {
  stream.end()
})


// arangoimport --file "/home/octavio/neighborhood-reviews/csv_files/users.csv" --type csv --create-collection true --collection "users" --translate "id=_key" --server.database _system
// —server.username "root"