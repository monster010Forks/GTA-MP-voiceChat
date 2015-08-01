/**
 * @overview Websocket class, which initializes a new websocket used for audio streaming
 * @author Jannis 'Cludch' Lehmann
 * @copyright (c) Cludch
 * @license See LICENSE file
 */

'use strict';

module.exports = class WebSocket {
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

    // Start the websocket server
    let binaryServer = require('binaryjs').BinaryServer;
    let websocketServer = binaryServer({port});

    websocketServer.on('connection', function(client) {
      console.log(client);
    });
  }
};
