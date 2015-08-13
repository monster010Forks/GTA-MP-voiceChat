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
    // Validate port variable
    if(isNaN(port)) {
      port = 8080;
    }

    // Start the websocket server
    var io = require('socket.io')(port);
    console.log(`Successfully started the websocket on port ${port}`);

    io.on('connection', function (socket) {
      socket.on('audioData', function(data) {
        // Forward the received data to every client
        socket.broadcast.emit('audioData', data);
      });

      socket.on('set networkId', function(networkId) {
        socket.networkId = networkId;
      });
      
    });
  }
};
