function Letter(char){
    this.char = char;
    this.isGuessed = false;
    this.guess = function(){
        return this.isGuessed ? this.char : '_';
    }
    this.updateGuess = function(char){
        this.isGuessed = this.char === char ? true : false;
    }
}

module.exports = Letter;