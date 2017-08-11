/*
 * BustaBot 4 By FinlayDaG33k
 * Version: 4.0.1-alpha
 * Licensed under the "FinlayDaG33k License"
 *
 *
 * "THE FINLAYDAG33K LICENSE" (Revision 2), Based on the "BEERWARE LICENSE":
 * <Aroop "FinlayDaG33k" Roelofs> wrote this file.
 * As long as you retain this notice you can do whatever you want with this stuff.
 * If we meet some day, you should buy me a drink.
 * Hugs are mandatory when meeting me!
 * Aroop "FinlayDaG33k" Roelofs Can NOT be held liable for any damages done!
 */
var currVersion = "4.0.1-alpha"; // The version of the bot, only here for cosmetics and tracking issues
var debug = true; // Set to true if you want to see every little variable change (Default: false)
/*
 * Our variables
 */

/* Some variables the inexperienced user may touch */
var baseBet = 1; // Our baseBet (Default: 1)
var dryRun = false; // Set to true if you want to disable betting (Default: false)

/* Some variables ONLY the experienced user should touch */
var baseMultiplier = 10; // Our baseMultiplier. (Default: 10)
var startBalance = engine.getBalance(); // Get our starting balance
var username = engine.getUsername(); // Get our Username
var firstGame = true; // Is it our first game? (Default: true)
var baseSatoshi = baseBet * 100; // Our baseBet in Satoshi (Default: baseBet * 100)
var currentMultiplier = baseMultiplier; // Our currentMultiplier (Default: same as baseMultiplier)
var currentBet = baseSatoshi; // Our currentBet (Default: same as baseSatoshi)
var currentGameID = -1; // Our current gameID (Default: -1)
var maximumBet = 1000000; // Maximum bet our bot will place in bits (Default: 1000000)


/*
 * Initialize our bot with some nice data
 */
console.clear(); // Clear our console to keep it clean
console.log('====== FinlayDaG33k\'s BustaBot 4 ======'); // Say hi
console.log('[Bustabot 4] Running Version: ' + currVersion); // Tell the version we are running
console.log('[Bustabot 4] My username is: ' + engine.getUsername()); // Tell our username
console.log('[Bustabot 4] Starting balance: ' + (startBalance / 100).toFixed(2) + ' bits'); // Tell our starting Balance
if(dryRun){
  logWarning("Dry run is enabled! No Actual betting will be taking place!");
}

/*
 * Some functions to ease the logging
 */
function logWarning(message){
  console.log('[Bustabot 4] %c' + message,'color: red;');
}

function logDebug(message){
  console.log('[Bustabot 4] %c' + message,'color: blue;');
}


/*
 * Our Event functions (Only touch these if you know what you are doing)
 */

/* When a game is starting */
engine.on('game_starting', function(data) {
  console.log('====== New Game #'+ data.game_id +' ======');
  /* Check if we played the last game, and if we won or lost */
  if (engine.lastGamePlay() == 'LOST' && !firstGame) { // If the last game was a loss
    logDebug('[Bustabot 4] Increasing our bet to: ' + (currentBet * 1.15 ));
    currentBet *= 1.15; // Increase our current bet by a factor of .15
  }else{ // If the last game was a win, or this is our first game
    currentBet = baseSatoshi; // Reset our bet to the baseBet
  }
  if(debug){
    logDebug('[Bustabot 4] Current bet: ' + currentBet + 'Satoshi');
  }

  /* Make sure we have enough to bet */
  if (currentBet <= engine.getBalance()){
    /* Check if we wanted to have a dryRun (without betting) */
    if(!dryRun){ // If we didn't want a dryRun
      console.log('[Bustabot 4] Betting ' + Math.round(currentBet / 100) + ' bits, cashing out at ' + currentMultiplier + 'x');
      engine.placeBet(Math.round(currentBet / 100) * 100, Math.round(currentMultiplier * 100), false); // Place our bet!
      firstGame = false;
    }
  }else{
    logWarning("Not enough bits to bet!");
  }
});

/* When a player has made a bet */
engine.on('player_bet', function(data) {
  if(data.username == username){
    console.log('[Bustabit 4] Placed our bet!');
  }
});

/* When a game has started */
engine.on('game_started', function(data) {
    console.log('[Bustabot 4] Game Started!');
});

/* When a player has cashed out */
engine.on('cashed_out', function(data) {
  if(data.username == username){
    console.log('[Bustabot 4] Succesfully cashed out at ' + (data.stopped_at / 100) + 'x');
  }
});

/* When a game has Crashed */
engine.on('game_crash', function(data) {
  console.log('[Bustabot 4] Game crashed at ' + (data.game_crash / 100) + 'x');
});
