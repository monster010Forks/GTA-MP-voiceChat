/**
 * @overview Utility file, contains helpful functions
 * @author Jannis 'Cludch' Lehmann
 * @copyright (c) Cludch
 * @license See LICENSE file
 */

'use strict';

let utility = module.exports;

/**
 * Returns the player object with the given network id
 * @param  {number} networkId The network id of a player
 * @return {Player}           Returns the player object if found, else returns null
 */
utility.getPlayer = (networkId) => {
  let player;
  // Iterate through every connect player and compare the network id
  for(let tempPlayer of g_players) {
    if(tempPlayer.networkId === networkId) {
      player = tempPlayer;
      break;
    }
  }
  return player;
};

/**
 * Returns the players distance to a point if the player is still in a given range
 *
 * This function was originally written by Extreme @ forum.GTA-MP.net
 * @param  {Player} player player object
 * @param  {number} range
 * @param  {number} x coordinate
 * @param  {number} y coordinate
 * @param  {number} z coordinate
 * @return {number} returns number if in range, else false
 */
utility.playerDistanceToPointInRange = (player, range, x, y ,z) => {
    let xPlayer = player.position.x;
    let yPlayer = player.position.y;
    let zPlayer = player.position.z;

    let xyzPlayer = (x * x) + (y * y) + (z * z);
    let xyzPoint = (xPlayer * xPlayer) + (yPlayer * yPlayer) + (zPlayer * zPlayer);

    return ((xyzPlayer - xyzPoint) < (range * range)) ? xyzPlayer-xyzPoint : false;
};
