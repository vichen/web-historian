var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./utils');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!


var statusCodeIn = 200;
var headers = httpHelpers.headers;

exports.handleRequest = function (request, response) {

  if (request.method === 'GET') {
    console.log('GET REQUEST for ', request.url);
    //checks if root
    if (request.url === '/') {
      // serves index.html
      console.log('youre getting the index');
      httpHelpers.serveAssets(response, archive.paths.index);
    } else {
      var requestUrl = request.url.slice(1);
      //checks if has been archived
      var testPath = archive.paths.archivedSites.concat(request.url);
      if (archive.isUrlArchived(testPath)) {
        // if archived send to serveAssets
        console.log('This file is archived!');
        httpHelpers.serveAssets(response, archive.paths);
      } else if (archive.isUrlInList(requestUrl)) {
        // check if on sites.txt list
        console.log('This file is on the list and (hopefully) loading');
        httpHelpers.serveAssets(response, archive.paths.loading);
      } else {
        // TODO: try to serve file from /public folder
        // Ex.  request => GET http://127.0.0.1/style.css
        //      respond => serve file public/style.css
        // If file does not exist => send back 404
      }
    }
  }

  if (request.method === 'POST') {
    //TODO:
    // 1) Get target URL from request body
    // 2) Add url to list
    // 3) Do a GET request to get content at target url and save it in /archive folder

    // console.log('This file was not on the list and we are adding to the list');
    // // add to list
    // archive.addUrlToList(requestUrl);
    // archive.download(requestUrl);
    // httpHelpers.serveAssets(response, archive.paths.loading);
  }
};
