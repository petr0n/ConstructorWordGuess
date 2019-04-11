let inquirer = require('inquirer');
let chalk = require('chalk');
let Word = require('./word');
let fs = require('fs');



let randomWord = function(){
    let data = fs.readFileSync('movies.txt', 'utf8');
    var lines = data.split('\n');
    return lines[Math.floor(Math.random()*lines.length)];
}

console.log(chalk.bold.cyanBright('Welcome to the Constructor Word Guess Game!'));
console.log(chalk.cyan('You get 10 bad guesses the movie title.\n'));

let ctr = 10;
let isFirstRun = true;
function run(){
    if (isFirstRun) {
        random = randomWord();
        w = new Word(random);
        console.log(chalk.bold.blueBright(w.wordToStr() + '\n'));
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
                    console.log(chalk.yellow('\nNo no no - you can only enter one letter'));
                } else {

                    let message = w.guessCharacter(answers.guess);
                    if (message == 'CORRECT!') {
                        console.log('\n' + chalk.green(message) + '\n');
                    } else {
                        console.log('\n' + chalk.red(message) + '\n');
                        ctr--;
                    }
                    console.log(chalk.yellow(ctr + ' guesses left') + '\n');
                    console.log(chalk.bold.blueBright(w.getWord()) + '\n');
                }
            } else {
                console.log(chalk.yellow('\nAt least enter something'));
            }
            if (w.allGuessed()) {
                console.log(chalk.bold.blueBright('========================\n'));
                console.log(chalk.bold.cyanBright('       YOU WIN!!! \n'));
                console.log(chalk.bold.blueBright('========================\n'));
                wantToPlayAgain();
            } else if (ctr < 1){
                console.log(chalk.bold.redBright('========================\n'));
                console.log(chalk.bold.redBright('      YOU LOSE!!! \n'));
                console.log(chalk.bold.redBright('========================\n'));
                wantToPlayAgain();
            } else {
                isFirstRun = false;
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
                ctr = 10;
                isFirstRun = true;
                run();
            } else {
                console.log(chalk.bold.yellow('\n Ok, good bye. \n'));
            }
        });
}