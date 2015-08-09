# GTA-MP voice chat

GTA-MP-voiceChat is a voice chat package for the GTA V multiplayer modification GTA-MP.

The first version will feature only the server side features because we can not
write the client side part currently.
But we will prepare as much as possible and adapt the client side part when GTA-MP gets released.

## Version

0.1.1

## Installation

  - Type `npm install` in the root directory of this repository
  - Put the whole folder (not content) into the `packages` directory of the STA
  - Check the `config.js` to configure the application
  - Run the STA

## Todos

 - GTA-MP client integration (+ remove the testing web server)
 - Direct communication -> look up which player is near the sending player
 - Associate server player object with socket on player connection
 - Code cleanup
 - Rewrite Recoder functions as a ES6 class

## Future Milestones

##### 0.2.0
 - MP3 instead of WAV

##### 0.3.0
 - Associate player object with the socket
 - Direct communication

##### 1.0.0
 - GTA-MP client integration

## Changelog

##### 0.1.0 (09.08.2015)

 - First release
 - Created a global voice chat
 - Added a browser client until GTA-MP is released, before we can not create client side code

##### 0.1.1 (09.08.2015)
 - Removed junk code
 - Fixed voice stuttering

## Scripts used
 - https://github.com/mattdiamond/Recorderjs

##  Bitcoin
If you want to donate me some coffee for further developments, my Bitcoin address is `16w7umTeoJfPzZnDbQtuefrPRssq21jhJ5`

License
----

MIT
