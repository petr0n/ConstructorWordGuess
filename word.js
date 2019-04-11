let Letter = require('./letter');
let l = new Letter();

function Word(w){
    this.wordArr = w.split('');
    this.isGuessed = false;
    this.totalChars = 0;
    
    this.wordToStr = function(){
        hiddenWord = [];
        this.wordArr.map(function(char, i){
            if (char == ' ') { // space char
                this['l' + i] = ' ';
                hiddenWord.push(' ');
            } else {
                this['l' + i] = new Letter(char);
                hiddenWord.push(this['l' + i].guess());
                this.totalChars++;
            }
        });
        return hiddenWord.join(' ');
    };

    this.charToGuess = function(char1){
        this.totalGuesses++;
        let message = 'INCORRECT!';
        this.wordArr.map(function(char, i){
            if (char1.toLowerCase() === char.toLowerCase()){
                this['l' + i].updateGuess(char);
                message = 'CORRECT!';
            }
        });
        return message;
    };

    this.getWord = function(){
        hiddenWord = [];
        this.wordArr.map(function(char, i){
            if (Object.keys(this['l' + i]).length > 1) {
                hiddenWord.push(this['l' + i].guess());
            } else {
                hiddenWord.push(' ');                
            }
        });
        return hiddenWord.join(' ');
    };

    this.allGuessed = function(){
        let numGuessed = 0;
        let cleanWord = this.wordArr.join('').replace(/\s/g, '');
        this.wordArr.map(function(char, i){ 
            if (Object.keys(this['l' + i]).length > 1 && this['l' + i].isGuessed) {
                numGuessed++;
            } 
        });
        return numGuessed == cleanWord.length ? true : false;
    }
}

module.exports = Word;