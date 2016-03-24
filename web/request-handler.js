var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./utils');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!


var statusCodeIn = 200;
var headers = httpHelpers.headers;

exports.handleRequest = function (request, response) {
  // if GET request for index.

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
        // check if on sites.txt list
      } else if (archive.isUrlInList(requestUrl)) {
        console.log('This file is on the list and (hopefully) loading');
        httpHelpers.serveAssets(response, archive.paths.loading);
        // if not on list
      } else {
        console.log('This file was not on the list and we are adding to the list');
        // add to list
        archive.addUrlToList(requestUrl);
        archive.download(requestUrl);
        httpHelpers.serveAssets(response, archive.paths.loading);
      }
      
    }
  }
};
    // write content of index.html to response

  // res.end(archive.paths.list);

