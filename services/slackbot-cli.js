// const { prompt } = require('enquirer');
const path = require('path');
const walk = require('../libs/walk');

const APP_DIR = './slackbot';
const run = async ({ name }) => {
  console.log(`${'>>'.bold} ${name.bold} let's connect to slack`);

  const fullAppDir = path.join(__dirname, APP_DIR);
  const filesList = await walk(fullAppDir);
  // Time to rewrite all files and then output

  return {
    dir: fullAppDir,
    result: filesList
  };
}

exports.run = run;
