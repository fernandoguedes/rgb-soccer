const path = require('path')
const fs = require('fs')
const request = require('request-promise')
const url = require('url')

const makeRequest = async (data) => {
  const options = {
      uri: 'http://localhost:8080',
    method: 'POST',
    body: { image: data },
    json: true
  }

  try {
    console.log(await request(options))
  } catch (error) {
     console.log(error)
  }
}

const getImageColors = async () => {
  let badge = path.join(__dirname, 'badges/atletico-pr.png')
  let file = fs.readFileSync(badge, 'base64') 
  await makeRequest(file) 
}

module.exports = getImageColors
