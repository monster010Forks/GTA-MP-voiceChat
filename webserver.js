/**
 * @overview Web server class, which initializes a new web server for the development purpose
 * @author Jannis 'Cludch' Lehmann
 * @copyright (c) Cludch
 * @license See LICENSE file
 */

'use strict';

module.exports = class WebServer {
  /**
   * Starts the socket and webserver on a given port
   * @param  {number} port
   */
  constructor(port) {
    port = parseInt(port);
    // Validate port var
    if(isNaN(port)) {
      port = 8080;
    }

    let express = require('express');
    let app = express();
    let httpServer = require('http').Server(app);

    app.use(express.static(__dirname + '/public'));

    app.get('/', function(req, res){
      res.sendFile('index.html');
    });

    httpServer.listen(port, function() {
      console.log(`Successfully started the web server on port ${port}`);
    });
  }
};
