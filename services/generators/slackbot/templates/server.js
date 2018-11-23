require('dotenv').config()
// const fetch = require('node-fetch');
const Koa = require('koa');
const Router = require('koa-router');
const portfinder = require('portfinder');
const chalk = require('chalk');
const bodyParser = require('koa-bodyparser');


const { IncomingWebhook } = require('@slack/client');

const log = console.log;

const app = new Koa();
const router = new Router();

// Middlewares
app.use(bodyParser());

// Incoming
const webhookIncomingUrl = process.env.SLACK_INCOMING_WEBHOOK_TOKEN;
log(`Webhook: ${webhookIncomingUrl}`);
const incomingWebhook = new IncomingWebhook(webhookIncomingUrl);

// Outgoing
// const webhookOutgoingUrl = process.env.SLACK_OUTCOMING_WEBHOOK_URL;


router.get('/ping', async (ctx) => {
  ctx.body = {
    ping: 'pong'
  };
});

router.post('/send', async (ctx) => {
  const { text } = ctx.request.body;
  // Send simple text to the webhook channel
  const res = await incomingWebhook.send({
    text
  });
  console.log('Message sent to slack: ', res);

  ctx.status = 200;
  ctx.body = {
    message: 'Send message to slack',
    response: res
  }
});

app.use(router.routes());

let server;
portfinder.getPortPromise({
  port: 2000, // minimum port
  stopPort: 2333 // maximum port
}).then((port) => {
  server = app.listen(port, () => {
    log(chalk.bold('Started service at'), chalk.blue.bold(port));
  });
});

module.exports = server;
