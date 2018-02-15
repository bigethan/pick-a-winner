/**
 * USAGE: node chooser.js name1 name2 name3 name4
 *
 * Will choose a name at random, and repeat until a name
 * has been chosen three times, that's the winner
 *
 * If you add a user named 'nobody' that's treated as
 * a special case where nobody wins
**/

const fs = require('fs');
const path = require('path');
const chalk = require("chalk");
const { exec } = require('child_process');
const pathToMedia = path.dirname(fs.realpathSync(__filename)) + '/'

let entrants = process.argv.slice(2);
let winners = {};
let roundCount = 1;


console.log("\n🎲 " + chalk.yellow(" Calculating Winner: First person chosen three times wins!\n"));
exec('afplay ' + pathToMedia + 'fanfare.mp3')

setTimeout(function() {
  let games = setInterval(function() {
    let omg = "";
    const winner = Math.round(Math.random() * (entrants.length - 1));
    winners[winner] = winners[winner] ? winners[winner] + 1 : 1;
    if (winners[winner] === 2) {
      omg = "❗";
      if (entrants[winner].toUpperCase() === "NOBODY") {
        exec('afplay ' + pathToMedia + 'uhoh.wav')
      } else {
        exec('afplay ' + pathToMedia + 'ooooh.wav')
      }
    }
    if (winners[winner] === 3) {
      omg = "🏅";
    }
    console.log(
      "⭐  Round " +
        roundCount +
        " won by: " +
        chalk.green(entrants[winner].toUpperCase()) +
        " | total wins: " +
        winners[winner] +
        omg +
        "\n"
    );

    roundCount += 1;

    if (winners[winner] === 3) {
      if (entrants[winner].toUpperCase() === "NOBODY") {
        exec('afplay ' + pathToMedia + 'boo.wav')
      } else {
        exec('afplay ' + pathToMedia + 'yay.wav')
      }
      console.log(
        chalk.bold(
          "\n\n      🎉  Winner! 🎉  is " + entrants[winner].toUpperCase()
        ) + "\n\n"
      );
      clearInterval(games);
    }
  }, 2500);
}, 2000);
