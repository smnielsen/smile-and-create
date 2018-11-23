const fs = require('fs');
const path = require('path');

const fsStat = (filepath) => (
  new Promise((resolve, reject) => {
    fs.stat(filepath, (err, stat) => {
      if (err) reject(err);
      else resolve(stat);
    })
  })
);

const fsReadDir = (dir) => (
  new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) reject(err);
      else resolve(files);
    })
  })
)

const walk = async (dir, filelist = []) => {
  const files = await fsReadDir(dir);
  let file;
  for (file of files) {
    const filepath = path.join(dir, file);
    const stat = await fsStat(filepath);
    console.log('filepath', filepath);

    if (stat.isDirectory()) {
      filelist = await walk(filepath, filelist);
    } else {
      filelist.push(filepath);
    }
  }

  return filelist;
}

module.exports = walk;
