let inquirer = require('inquirer');
let chalk = require('chalk');
let Word = require('./word');
let fs = require('fs');



let ctr = 1;
let randomWord = function(){
    let data = fs.readFileSync('movies.txt', 'utf8');
    var lines = data.split('\n');
    return lines[Math.floor(Math.random()*lines.length)];
}

console.log(chalk.bold.cyan('Welcome to the Constructor Word Guess Game!\n'));

function run(){
    if (ctr === 1) {
        random = randomWord();
        w = new Word(random);
        console.log(w.wordToStr() + '\n');
    }

    inquirer
        .prompt([{
            type: 'input',
            message: 'Guess a letter!',
            name: 'guess'
        }])
        .then(answers => {
            if (answers.guess !== '') {
                if (answers.guess.length > 1) {
                    console.log(chalk.bold.yellow('\nNo no no - you can only enter one letter'));
                } else {

                    let message = w.charToGuess(answers.guess);
                    if (message == 'CORRECT!') {
                        console.log('\n' + chalk.bold.green(message) + '\n');
                    } else {
                        console.log('\n' + chalk.bold.red(message) + '\n');
                    }
                    console.log(chalk.bold.blueBright('\n' + w.getWord()) + '\n');
                }
            } else {
                console.log(chalk.bold.yellow('\nAt least enter something'));
            }
            if (w.allGuessed()) {
                console.log(chalk.bold.blueBright('========================\n'));
                console.log(chalk.bold.cyanBright('       YOU WIN!!! \n'));
                console.log(chalk.bold.blueBright('========================\n'));
                wantToPlayAgain();
            } else {
                ctr++;
                run();
            }
        });
}
run();

function wantToPlayAgain(){
    inquirer
        .prompt([{
            type: 'list',
            choices: [ 'Yes', 'No' ],
            message: 'Want to play again?',
            name: 'playAgain'
        }])
        .then(answers => {
            if (answers.playAgain == 'Yes') {
                ctr = 1;
                run();
            } else {
                console.log(chalk.bold.yellow('\n Ok, good bye. \n'));
            }
        });
}