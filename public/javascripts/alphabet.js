const USED = -1; //letter has been used, not available anymore
const AVAIL = 1; //letter has not been used yet

function Alphabet() {
  this.letters = undefined;

  this.initialize = function() {
    this.letters = {
      A: AVAIL,
      B: AVAIL,
      C: AVAIL,
      D: AVAIL,
      E: AVAIL,
      F: AVAIL,
      G: AVAIL,
      H: AVAIL,
      I: AVAIL,
      J: AVAIL,
      K: AVAIL,
      L: AVAIL,
      M: AVAIL,
      N: AVAIL,
      O: AVAIL,
      P: AVAIL,
      Q: AVAIL,
      R: AVAIL,
      S: AVAIL,
      T: AVAIL,
      U: AVAIL,
      V: AVAIL,
      W: AVAIL,
      X: AVAIL,
      Y: AVAIL,
      Z: AVAIL
    };
  };

  //is it a valid letter?
  this.isLetter = function(letter) {
    return Object.prototype.hasOwnProperty.call(this.letters,letter);
  };

  //is it an available letter?
  this.isLetterAvailable = function(letter) {
    return this.isLetter(letter) && this.letters[letter] == AVAIL;
  };

  this.makeLetterUnAvailable = function(letter) {
    if (this.isLetter(letter)) {
      this.letters[letter] = USED;

      //switch off the UI element by adding the 'disabled' class name (defined in game.css)
      document.getElementById(letter).className += " disabled";
    }
  };

  //does the letter appear in the word?
  this.isLetterIn = function(letter, word) {
    if (!this.isLetter(letter) || !this.isLetterAvailable(letter)) {
      return false;
    }
    return word.indexOf(letter) >= 0;
  };

  //return letter indices in the word
  this.getLetterInWordIndices = function(letter, word) {

    let res = [];

    if (!this.isLetterIn(letter, word)) {
      console.log("Letter [%s] is not in target word [%s]!", letter, word);
      return res;
    }

    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) == letter) {
        res.push(i);
      }
    }
    return res;
  };
}