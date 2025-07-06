const sharp = require('sharp');

sharp('public/images/tasks-flow-logo-min.png')
  .webp({ quality: 80 })
  .toFile('public/images/tasks-flow-logo.webp')
  .then(info => {
    console.log('Logo converted successfully:', info);
  })
  .catch(err => {
    console.error('Error converting logo:', err);
  }); 