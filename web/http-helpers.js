var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html' // not always going to be html. TODO: accept all files
};

exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  
  fs.readFile(asset, 'utf8', function(error, data) {
    if (error) {
      response.writeHeader(404, headers);
      response.end('error: ' + error);
    } else {
      console.log('serving content for ', asset);
      response.writeHeader(200, headers);
      response.end(data);
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
