/**
 * @overview Websocket class, which initializes a new websocket used for audio streaming
 * @author Jannis 'Cludch' Lehmann
 * @copyright (c) Cludch
 * @license See LICENSE file
 */

'use strict';

let config = require('./config');
let utility = require('./utility');

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
        let player = utility.getPlayer(socket.networkId);
        // Should be ALWAYS false
        if(typeof player === 'undefined') {
          return;
        }

        for(let tempPlayer of g_players) {
          // Check if the player is in range of the speaking player
          let playerDistanceToPointInRange = utility.playerDistanceToPointInRange(tempPlayer, config.directChatRadius, socket.player.position.x, socket.player.position.y, socket.player.position.z);

          if(typeof playerDistanceToPointInRange !== 'number') {
            return;
          }

          // Is in range, so search the socket of the receiving player
          for(let tempSocket of io.sockets.connected) {
            // Check if this socket belongs to one of the supposed receiving players
            if(tempSocket.networkId === tempPlayer.networkId) {
              tempSocket.emit('audioData', {data: data.data, volume: (playerDistanceToPointInRange / (config.directChatRadius * config.directChatRadius))});
            }
          }
        }
      });

      // Like a global voice chat
      // Temporary only for web testing the voice chat in general
      socket.on('web audioData', function(data) {
        socket.broadcast.emit('web audioData', {data: data.data, volume: 1});
      });

      socket.on('set networkId', function(networkId) {
        socket.networkId = networkId;
      });
    });
  }
};
