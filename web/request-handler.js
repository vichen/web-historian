var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./utils');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
var Promise = require('bluebird');
var mime = require('mime-types');
// require more modules/folders here!

// var isUrlInlist = Promise.promisify(archive.isUrlInlist);
// var addUrlToList = Promise.promisify(archive.addUrlToList);
// var isUrlArchived = Promise.promisify(archive.isUrlArchived);
Promise.promisifyAll(fs);
Promise.promisifyAll(archive);

var statusCodeIn = 200;
var headers = httpHelpers.headers;

exports.handleRequest = function (request, response) {



  if (request.method === 'GET') {
    console.log('GET REQUEST for ', request.url);
    //checks if root
    if (request.url === '/') {
      // serves index.html
      httpHelpers.serveAssets(response, archive.paths.index);
    } else {
      var requestUrl = request.url.slice(1);
      //checks if has been archived
      var testPath = archive.paths.archivedSites.concat(request.url);
      return archive.isUrlArchivedAsync(testPath)
        .then(function(hasFile) {
          if (hasFile) {
            console.log('Good news! That URL is archived');
            httpHelpers.serveAssets(response, testPath);
          } 
        })
        .catch(function(error) {
          response.writeHead(404, {'content-type': mime.lookup(testPath)});
          // httpHelpers.serveAssets(404, null);
          response.end();
          console.log(error);
          
        });
    } 

      //if not get index
      // check if is archived
        // if is archived
          // serve archived file
        // if is not archived
          // check if is in the list
            // if in the list 
              // serve loading html
            // if not in the list
              // return 404
              // add to the list
                // serve loading page 



      //   // TODO: try to serve file from /public folder
      //   // Ex.  request => GET http://127.0.0.1/style.css
      //   //      respond => serve file public/style.css
      //   // If file does not exist => send back 404
  }
  

  if (request.method === 'POST') {
    //TODO:
    // 1) Get target URL from request body
    // 2) Add url to list
    // 3) Do a GET request to get content at target url and save it in /archive folder
    var data = '';
    request.on('data', function(chunk) {
      data += chunk;

    });
    request.on('end', function() {
      var url = data.replace(/url\=/, '');
      return archive.addUrlToListAsync(url)
        .then(function(didWrite) {
          if (didWrite) {
            response.writeHead(302, mime.lookup(url));
            response.end();
          } else {
            throw new Error('there was an error adding url to list in post');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
         
        
    });
      // var dataParsed = JSON.parse(data);
      // console.log(dataParsed);
    


    // console.log('This file was not on the list and we are adding to the list');
    // // add to list
    // archive.addUrlToList(requestUrl);
    // archive.download(requestUrl);
    // httpHelpers.serveAssets(response, archive.paths.loading);
  }
};
