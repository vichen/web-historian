var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var getArrayOfUrls = function (filePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', function(error, data) {
      if (error) {
        reject(error);
      } else {
        var lines = data.split('\n');
        resolve(lines);
      }
    });
  });
};

var runDownloads = function() {
  return getArrayOfUrls(archive.paths.archivedSites)
    .then(function(urlArray) {
      return archive.downloadUrls(urlArray);
    });
  
};


