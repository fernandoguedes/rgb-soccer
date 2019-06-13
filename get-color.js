const path = require('path')
const getColors = require('get-image-colors')
const fs = require('fs')
const rgbHex = require('rgb-hex')
const ColorThief = require('color-thief')
const colorThief = new ColorThief()

const getColorsByColorThief = (image) => {
  let rgbs = colorThief.getPalette(fs.readFileSync(image))
  return rgbs.map(rgb => rgbHex(rgb.join(',')))
}

const getColorsByGetColors = async (image) => {
  let rgbs = await getColors(image)
  return rgbs.map(color => color.hex().replace('#',''))
}

const getImageColors = async () => {
  const badge = path.join(__dirname, 'badges/atletico-pr.png')
  let colorsByColorThief = getColorsByColorThief(badge)
  let colorsByGetColors = await getColorsByGetColors(badge)


  let predominantColors = colorsByColorThief.filter(val => colorsByGetColors.includes(val))
  console.log(predominantColors)
}

module.exports = getImageColors
