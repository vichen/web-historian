var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var Promise = require('bluebird');
var mime = require('mime-types');

exports.headers = headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
};

exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)


  fs.readFile(asset, 'utf8', function(error, data) {
    if (error) {
      console.log('there was an error serving the file');
      response.writeHead(404, {'content-type': mime.lookup(asset)});
      // callback(error, null);
      response.end('error: ' + error);
    } else {
      console.log('serving content for ', asset);
      response.writeHead(200, {'content-type': mime.lookup(asset)});
      // callback(null, data);
      response.end(data);
    }
  });  
};



// As you progress, keep thinking about what helper functions you can put here!
