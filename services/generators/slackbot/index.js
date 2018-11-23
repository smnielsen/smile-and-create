'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
// const chalk = require('chalk');
// const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(context, props) {
    super(context, props)
    this.sourceRoot(path.join(__dirname, 'templates'));

    this.name = props.name;
  }

  dest() {
    return `${this.destinationRoot(this.name)}`
  }
  // Ask for user input
  async prompting() {
    let answers = {};

    answers.incomingWebhook = await this.prompt({
      type: 'input',
      name: 'token',
      message: 'Incoming Webhook token: (can be added to .env later)'
    });

    answers.outgoingWebhook = await this.prompt({
      type: 'input',
      name: 'token',
      message: 'Outgoing Webhook token: (can be added to .env later)'
    });

    answers.botToken = await this.prompt({
      type: 'input',
      name: 'token',
      message: 'Slackbot token: (can be added to .env later)'
    });

    this.data = {
      ...answers
    };
  }

  // Writing Logic here
  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(`package.json`), {
        name: this.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('.env'),
      this.destinationPath(`.env`), {
        incomingWebhook: this.data.incomingWebhook
      }
    );
    this.fs.copyTpl(
      this.templatePath('server.js'),
      this.destinationPath(`server.js`), {
        name: this.name
      }
    );
  }

  // Install Dependencies
  install() {
    this.npmInstall();
  }
};
