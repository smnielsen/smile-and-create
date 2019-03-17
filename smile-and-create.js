#!/usr/bin/env node
require('colors');
const yeoman = require('yeoman-environment');
const { prompt } = require('enquirer');
const commander = require('commander');

const generators = {
  'node.js': require('./services/generators/nodejs/index'),
  'slackbot': require('./services/generators/slackbot/index'),
  'isomorphic': require('./services/generators/isomorphic/index')
};

// Let some defaults be available
commander
  .option('-n, --name [name]', 'Name of the application')
  .option('-t, --type [type]', 'Type of application')
  .parse(process.argv);

const getType = async () => {
  // Run the basic setup methods
  let type = commander.type;
  if (type && !generators[type]) {
    console.log(`${type.white} is not a valid type of service`.yellow)
    type = null;
  }
  if (!type) {
    type = (await prompt({
      type: 'select',
      name: 'type',
      message: 'Choose your service',
      choices: Object.keys(generators)
    })).type;
  }

  return type;
}

const getName = async () => {
  let name = commander.name;
  if (!name || typeof name !== 'string') {
    name = (await prompt({
      type: 'input',
      name: 'name',
      message: 'Choose your service name'
    })).name;
  };

  return name;
}

const run = async () => {
  const type = await getType();
  const name = await getName();

  if (!name || !type) {
    throw new Error('#! Please define "type" and "name" to continue'.red.bold);
  }

  // Now run the specific service setup
  const generator = generators[type];
  if (!generator) {
    throw new Error(`#! ${generator} is not a valid generator`.red.bold);
  }

  // Run Yeoman
  const yoEnv = yeoman.createEnv();
  yoEnv.registerStub(generator, `service:${name}`);
  yoEnv.run(`service:${name}`, { name });
}

console.log('process.argv', process.cwd());
run()
  .then(() => {
    console.log(`# CLI Started Creation...`.green.bold)
  })
  .catch((err) => {
    console.error(`CLI execution failed`, err)
  })

