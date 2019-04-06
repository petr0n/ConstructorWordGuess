let inquirer = require('inquirer');
let chalk = require('chalk');
let Word = require('./word');

let w = new Word('constitution');



w.wordToStr();
console.log(w.wordToStr());
w.charToGuess('c');
console.log(w.wordToStr());