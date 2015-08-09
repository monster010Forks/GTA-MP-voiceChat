/**
 * @overview Entry point of the package
 * @author Jannis 'Cludch' Lehmann
 * @copyright (c) Cludch
 * @license See LICENSE file
 */

'use strict';

let config = require('./config');
let Websocket = require('./websocket');
let Webserver = require('./webserver');

/**
 * Entry point
 * @param number port to listen the websocket on
 * @param number port to listen the development web server on
 */
function main(port, webserverPort) {
    new Websocket(port);
    new Webserver(webserverPort);

    console.log("\n----- GTA-MP voice chat -----");
    console.log("Authors: Cludch");
    console.log("Contributors: derbl4ck");
    console.log(`Port: ${port}`);
    console.log(`Web server port: ${webserverPort}`);
    console.log("-----------------------------\n");
}

main(config.port, config.webserverPort);
