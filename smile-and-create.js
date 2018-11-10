#!/usr/bin/env node
require('colors');
const { prompt } = require('enquirer');
const commander = require('commander');

const replace = require('./libs/replace');

const services = {
  'slackbot': require('./services/slackbot-cli')
};

// Let some defaults be available
commander
  .option('-n, --name [name]', 'Name of the application')
  .option('-t, --type [type]', 'Type of application')
  .parse(process.argv);

const getType = async () => {
  // Run the basic setup methods
  let type = commander.type;
  if (type && !services[type]) {
    console.log(`${type.white} is not a valid type of service`.yellow)
    type = null;
  }
  if (!type) {
    type = (await prompt({
      type: 'select',
      name: 'type',
      message: 'Choose your service',
      choices: Object.keys(services)
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

const dehydrateAllFiles = async (files, properties) => (
  Promise.all(files.map(async (file) => {
    // const data = await replace(file, properties);
    // const output = path.absolute(__dirname, '_test.js');
    // fs.writeFile(output, data, 'utf8', function (err) {
    //   if (err) reject(err);
    //   else resolve()
    // });
  }))
)

const run = async () => {
  const type = await getType();
  const name = await getName();

  if (!name || !type) {
    console.error('#! Please define "type" and "name" to continue'.red.bold);
    process.exit(1);
  }

  // Now run the specific service setup
  const service = services[type];
  const result = await service.run({ name });

  const properties = {
    name,
    ...result.properties
  };

  // Now let's copy dirs
  console.log(`Result from ${type}`, result);
  await dehydrateAllFiles(result.files, properties);
}

run()
  .then(() => {
    console.log(`# CLI executed successfully`.green.bold)
  })
  .catch((err) => {
    console.error(`CLI execution failed`, err)
  })

