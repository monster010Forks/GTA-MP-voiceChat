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
    const playerSocket = new Map();

    // Start the websocket server
    let io = require('socket.io')(port);
    console.log(`Successfully started the websocket on port ${port}`);


    io.on('connection', function(socket) {
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
          if(!playerSocket.has(tempPlayer.networkId)) {
            console.warn(`No recipient socket for networkId ${tempPlayer.networkId} found.`);
            return;
          }
          playerSocket.get(tempPlayer.networkId).emit('audioData', {data: data.data, volume: (playerDistanceToPointInRange / (config.directChatRadius * config.directChatRadius))});
        }
      });

      // Like a global voice chat
      // Temporary only for web testing the voice chat in general
      socket.on('web audioData', function(data) {
        socket.broadcast.emit('web audioData', {data: data.data, volume: 1});
      });

      socket.on('set networkId', function(networkId) {
        socket.networkId = networkId;
        if(playerSocket.has(networkId)) {
          console.warn(`playerSocket already has networkId ${networkId}`);
          return;
        }
        playerSocket.set(networkId, socket);
      });

      socket.on('disconnect', function(socket) {
        playerSocket.delete(socket.networkId);
      });
    });
  }
};
