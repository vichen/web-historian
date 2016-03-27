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
  'Content-type': 'text/html'
};

var readFile = Promise.promisify(fs.readFile);

exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  var encoding = {encoding: 'utf8'};

  return readFile(archive.paths.siteAssets + asset, encoding)
    .then(function(contents) {
      contents && exports.sendResponse(response, contents);
    })
    .catch(function(error) {
      // file doesn't exist in public
      return readFile(archive.paths.archivedSites + asset, encoding);
    })
    .then(function(contents) {
      contents && exports.sendResponse(response, contents);
    })
    .catch(function(error) {
      callback ? callback() : exports.send404(response);
    });

  // fs.readFile(archive.paths.siteAssests + asset, encoding, function(error, data) {
  //   if (error) {
  //     // file doesn't exist in public
  //     fs.readFile( archive.paths.archivedSites + asset, encoding, function(error, data) {
  //       if (error) {
  //         // file doesn't exist in archive
  //         callback ? callback() : exports.send404(res);
  //       } else {
  //         exports.sendResponse(response, data);
  //       }
  //     });
  //   } else {
  //     exports.sendResponse(response, data);
  //   }
  // });  
};



// As you progress, keep thinking about what helper functions you can put here!

exports.sendRedirect = function(response, location, status) {
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};

exports.sendResponse = function(response, obj, status) {
  status = status || 200;
  response.writeHead(status, headers);
  response.end(obj);
};

exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(data);
  });
};

exports.send404 = function(response) {
  exports.sendResponse(response, '404: Page not found', 404);
};















