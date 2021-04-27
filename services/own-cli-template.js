const { prompt } = require('enquirer')
const path = require('path')
const walk = require('../libs/walk')
const log = require('../libs/logger')

const APP_DIR = './slackbot'

const run = async ({ name }) => {
  log.info(`${'>>'.bold} ${name.bold} let's connect to slack`)

  const { token: incomingWebhook = '' } = await prompt({
    type: 'input',
    name: 'token',
    message: 'Incoming Webhook token: (can be added to .env later)',
  })

  const { token: outgoingWebhook = '' } = await prompt({
    type: 'input',
    name: 'token',
    message: 'Outgoing Webhook token: (can be added to .env later)',
  })

  const { token: botToken = '' } = await prompt({
    type: 'input',
    name: 'token',
    message: 'Slackbot token: (can be added to .env later)',
  })

  // Read all files and start process them
  const fullAppDir = path.join(__dirname, APP_DIR)
  const filesList = await walk(fullAppDir)
  // Time to rewrite all files and then output

  return {
    properties: {
      incomingWebhook,
      outgoingWebhook,
      botToken,
    },
    files: filesList,
  }
}

exports.run = run
