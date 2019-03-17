'use strict';
require('colors');
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

    answers = await this.prompt([
      {
        type: 'input',
        name: 'description',
        default: '...',
        message: 'Please input description'
      },
      {
        type: 'input',
        name: 'author',
        default: '...',
        message: 'Who is the author?'
      }
    ]);

    this.data = {
      name: this.name,
      ...answers
    };
    console.log(this.data);
  }

  // Writing Logic here
  writing() {
    // Copy entire template
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.data);

    // Copy dotfiles
    this.fs.copy(
      this.templatePath('**/.*'),
      this.destinationPath(),
      { globOptions: { dot: true } }
    );
  }

  // Install Dependencies
  install() {
    // this.yarnInstall();

    // Print USAGE
    console.log(`
    ${`== Successfully setup application ===`.green.bold}

    ${'# Welcome to your new Isomorphic React App.'.bold}

    ## Navigate to app
      $ ${`cd ${this.name}`.yellow}
  
    ## Install dependencies
      $ ${`yarn install`.blue}

    ## Start development server
      $ ${`yarn dev`.blue}

    ## Build for production
      $ ${`yarn build`.blue}
    `);
  }
};
