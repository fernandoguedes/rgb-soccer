const path = require('path')
const fs = require('fs')
const request = require('request-promise')
const url = require('url')

const getBadgePath = (file = '') => {
  return path.join(__dirname, `badges/${file}`)
}

const makeRequest = async (file) => {
  const options = {
    uri: 'https://rigabe.mybluemix.net/upload',
    method: 'POST',
    body: { image: file.b64 },
    json: true
  }

  try {
    console.log(await request(options))
    console.log(file.team)
  } catch (error) {
     console.log(error)
  }
}

const getImageColors = async () => {
  let badge = getBadgePath('atletico-mg.png')
  let file = fs.readFileSync(badge, 'base64')
  let files = getBase64(await getBadges())
  let requests = generateRequests(files)
  await Promise.all(requests)
}

const generateRequests = (files) => {
  return files.map(file => {
    return makeRequest(file)
  })
}

const getBase64 = (files) => {
  return files.map(file => {
    return {
      team: file,
      b64: fs.readFileSync(getBadgePath(file), 'base64')
    }
  })
}

const getBadges = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(__dirname, 'badges/'), function (err, files) {
        if (err) {
            return reject(err)
        }

        return resolve(files)
    })
  })
}

module.exports = getImageColors
