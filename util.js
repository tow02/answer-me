const fs = require('fs')

const folder = './static/images'

fs.readdir(folder, (err, files) => {
  console.log(files);
})
