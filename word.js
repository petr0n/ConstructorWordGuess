let Letter = require('./letter');
let l = new Letter();

function Word(w){

    this.wordArr = w.split('');
    this.isGuessed = false;
    this.totalChars = 0;
    this.wordLength = this.wordArr.join('').replace(/\s/g, '').length;
    
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
    
    // character guess
    this.guessCharacter = function(char1){
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

    // get word
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

    // has the word been guess?
    this.allGuessed = function(){
        let numGuessed = 0;
        this.wordArr.map(function(char, i){ 
            if (Object.keys(this['l' + i]).length > 1 && this['l' + i].isGuessed) {
                numGuessed++;
            }
        });
        return numGuessed == this.wordLength ? true : false;
    }

}

module.exports = Word;