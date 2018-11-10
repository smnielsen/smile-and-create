// Read file and replace values
const fs = require('fs')

const replace = async (file, properties) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', function (err, template) {
      if (err) {
        return console.log(err);
      }

      let result = template;
      let i;
      let reg;
      for (i in properties) {
        reg = new RegExp('{{' + i + '}}', 'g');
        result = result.replace(reg, properties[i]);
      }
      resolve(result);
    });
  });
};

module.exports = replace;
