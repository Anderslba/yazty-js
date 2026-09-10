import { startGame } from "./yatzy.js";

const btnRollDie = document.querySelector('#roll-button');
const btnReset = document.querySelector('reset-button');
const diceElement = document.querySelector('.die');



const game = startGame();

