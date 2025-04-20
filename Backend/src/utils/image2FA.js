const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

const imageDir = path.join(__dirname, '../images');

exports.generate2FACodeFromRandomImage = async () => {
  const images = fs.readdirSync(imageDir);
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const imagePath = path.join(imageDir, randomImage);

  const { data } = await sharp(imagePath)
    .resize(64, 64)
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const sampled = [];
  for (let i = 0; i < data.length; i += 5) {
    sampled.push(data[i]);
  }

  const binary = sampled.map(val => val.toString(2).padStart(8, '0')).join('');
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const hash = crypto.createHash('sha512').update(binary + timestamp).digest('hex');
  const digitsOnly = hash.replace(/\D/g, '');

  return {
    code: digitsOnly.slice(0, 8) || '00000000',
    imageName: randomImage
  };
};
