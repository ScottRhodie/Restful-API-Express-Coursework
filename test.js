const madge = require('madge');

madge('/Users/scottrhodie/Desktop/Restful-API-Express-Coursework/index.js')
  .then((res) => res.image('/Users/scottrhodie/Desktop/Restful-API-Express-Coursework/image.svg'))
  .then((writtenImagePath) => {
    console.log('Image written to ' + writtenImagePath);
  });