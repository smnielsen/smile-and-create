import React from "react";
import { renderToString } from "react-dom/server";
import assets from './assets.json';
import App from "../client/components/App";
import logger from '../lib/logger';

const debug = logger('render');

const htmlTemplate = ( reactDom ) => {
  const { scripts, styles } = Object.keys(assets).reduce((memo, key) => {
    const asset = assets[key];
    if (asset.js) {
      // eslint-disable-next-line no-param-reassign
      memo.scripts = `<script src="${asset.js}"></script>${memo.scripts}`;
    }
    if (asset.css) {
      // eslint-disable-next-line no-param-reassign
      memo.styles = `<link rel="stylesheet" type="text/css" href="${asset.css}"></link>${memo.styles}`;
    }
    return memo;
  }, { scripts: '', styles: '' });

  return   `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Holidays | Simon Nielsen</title>
      ${styles}
  </head>
  
  <body>
      <div id="root">${ reactDom }</div>
      ${scripts}
  </body>
  </html>
  `;
};

module.exports = ctx => {
  const jsx = ( <App /> );
  const reactDom = renderToString( jsx );
  debug(`Rendering App`);
  ctx.status = 200;
  ctx.body = htmlTemplate( reactDom );
};