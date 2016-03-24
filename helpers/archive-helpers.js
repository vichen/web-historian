var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request'); // don't actually need request

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

// doesn't need callback
exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(error, data) {
    if (error) {
      console.log('you got an error in read list of URLs', error);
    } else {
      var listOfUrls = data.split('\n');
      console.log(listOfUrls);
      callback(listOfUrls);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', function(error, data) {
    if (error) { 
      console.log('Error in isUrlInList, could not read file');
      callback(error, null);
    }
    if (data.indexOf(url) < 0) {
      console.log('isUrlInList: false');
      callback(null, false);
    } else {
      console.log('isUrlInList: true');
      callback(null, true);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function(error) {
    if (!error) {
      callback(null, true);
    } else {
      callback(error, null);
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  console.log('we\'re checking if this url exists ', url);
  fs.stat(url, function(error, stats) {
    if (error) {
      console.log('Oops, you got an error from stat in #isUrlArchived: ');
      callback(error, null);
    } else {
      console.log('this is stats.isFile ', stats.isFile());
      callback(null, stats.isFile());
    } 
  });
};

// should take in an array
exports.downloadUrls = function(arrayOfUrls) {
  // for each element in the array
    // call download on it
  for (var url of arrayOfUrls) {
    exports.download(url);
  }

  var files = fs.readdirSync(exports.paths.archivedSites);
  console.log('heres the list of files ', files);
};


exports.download = function(url) {
  var destination = exports.paths.archivedSites + '/' + url;
  url = 'http://' + url;
  console.log(url);
  request(url, function(error, response, body) {
    if (error) {
      console.log('download error ', error);
    }

    fs.writeFile(destination, body, function(error) {
      if (!error) {
        console.log('success creating file');
      } else {
        console.log('error ', error);
      }
    });
  });
};




