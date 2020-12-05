const fs = require('fs')
const faker = require('faker')
const argv = require('yargs').argv

const lines = argv.lines || 1000000
const filename = argv.output || 'posts.csv'
const writeStream = fs.createWriteStream(filename)