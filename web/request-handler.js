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
  console.log(request.url);
  if (request.method === 'GET') {

    httpHelpers.serveAssets(response, archive.paths.index);
    //checks if root
      // serves index.html
    //checks if has been archived
      // if archived send to serveAssets
      // else 
        // check if on sites.txt list
          // if not on list
            // add to list
          // if on list
            // serve user the 'fetching archive' html
  }
};
    // write content of index.html to response

  // res.end(archive.paths.list);

