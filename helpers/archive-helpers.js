var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html'),
  loading: path.join(__dirname, '../web/public/loading.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function() {
};

exports.isUrlInList = function(url) {
  fs.readFile(exports.paths.list, function(error, data) {
    if (error) { throw error; }

    if (data.indexOf(url) < 0) {
      return false;
    } else {
      return true;
    }
  });
};

exports.addUrlToList = function(url) {
  fs.writeFile(exports.paths.list, url, function(error) {
    if (!error) {
      console.log('added to list');
      fs.readFile(exports.paths.list, 'utf8', function(error, data) {
        if (!error) {
          console.log('Here is the data in the file', data);
        } else {
          console.log('there was an error reading txtFile');
        }
      });
    } else {
      console.log(error);
    }
  });
};

exports.isUrlArchived = function(url) {
  fs.stat(url, function(error, stat) {
    if (!error) {
      return true;
    } else {
      return false;
    }
  });
};

exports.downloadUrls = function() {

};

exports.download = function(url) {
  request(url, function(error, response, body) {
    console.log(body);
  });


  // var destination = exports.paths.archivedSites + '/' + url;
  // var pageContent = http.get(url, function(response) {
  //   var data = '';
  //   response.setEncoding('utf8');
  //   response.on('data', function(chunk) {
  //     data += chunk;
  //   });
  //   response.on('end', function() {
  //     return data;
  //   });
  // }).on('error', function(error) {
  //   console.log(error);
  // });

  // console.log(pageContent);

  // fs.writeFile(destination, pageContent, function(error) {
  //   if (!error) {
  //     console.log('success creating file');
  //   } else {
  //     console.log('error ', error);
  //   }
  // });

};