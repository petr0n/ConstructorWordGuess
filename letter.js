

function Letter(char){
    this.char = char;
    this.isGuessed = false;
    this.guess = function(){
        return this.isGuessed ? this.char : '_';
    }
    this.update = function(char){
        console.log(char);
        this.isGuessed = this.char === char ? true : false;
        
        // if (this.char === char) {
        //     this.isGuessed = true;
        // } else {
        //     this.isGuessed = false;
        // }
    }
}

module.exports = Letter;


/* 
A string value to store the underlying character for the letter

A boolean value that stores whether that letter has been guessed yet

A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed

A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
*/