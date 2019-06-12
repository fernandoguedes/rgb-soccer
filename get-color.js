const path = require('path')
const getColors = require('get-image-colors')
const fs = require('fs')
const rgbHex = require('rgb-hex')
var colorThief = require('color-thief')
colorThief = new colorThief()
const _ = require('lodash')

const colors = async () => {
  const badge = path.join(__dirname, 'badges/atletico-mg.png')

  let rgbs1 = await getColors(badge)
  let proof1 = rgbs1.map(color => color.hex().replace('#','')) 

  let rgbs2 = colorThief.getPalette(fs.readFileSync(badge))
  let proof2 = rgbs2.map(rgb => rgbHex(rgb.join(',')))

  console.log(proof1, proof2)
}

colors()
