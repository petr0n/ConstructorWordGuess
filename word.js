let Letter = require('./letter');
let l = new Letter();

function Word(w){
    this.wordArr = w.split('');
    this.wordToStr = function(){
        let hiddenWord = [];
        this.wordArr.map(function(char){
            l = new Letter(char);
            hiddenWord.push(l.guess());
        });
        console.log(l);
        return hiddenWord.join(' ');
    };
    this.charToGuess = function(char){
        this.wordArr.map(function(char1){
            if (char === char1) {
                l.isGuessed = true;
            }
            l.update(char);
        });
    }

}

module.exports = Word;

/*
An array of new Letter objects representing the letters of the underlying word
A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.

A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)


*/
