/*
 * BustaBot 4 By FinlayDaG33k
 * Version: 4.0-base
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

/*
 * Our variables
 */

/* Some variables the inexperienced user may touch */
var baseBet = 1; // Our baseBet

/* Some variables ONLY the experienced user should touch */
var startBalance = engine.getBalance();
var username = engine.getUsername();

/*
 * Our Event functions (Only touch these if you know what you are doing)
 */

/* When a game is starting */
engine.on('game_starting', function(info) {
  console.log('Game Starting in ' + info.time_till_start);
});

/* When a player has made a bet */
engine.on('player_bet', function(data) {
    console.log('The player ', data.username, ' placed a bet. This player could be me :o.')
});

/* When a game has started */
engine.on('game_started', function(data) {
    console.log('Game Started', data);
});

/* When a player has cashed out */
engine.on('cashed_out', function(resp) {
    console.log('The player ', resp.username, ' cashed out. This could be me.');
});

/* When a game has Crashed */
engine.on('game_crash', function(data) {
  console.log('Game crashed at ', data.game_crash);
});
