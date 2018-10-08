// variables
var entryArea = document.querySelector('textarea');
var wordCount = document.getElementById('word-count');
var charCount = document.getElementById('character-count');

var countWords = function(words){
    var words = words.split(' ');
    var words = words.filter(word => word);
    wordCount.textContent = words.length;
}

var countChars = function(chars){
    chars = chars.replace(/\s/g, '');
    charCount.textContent = chars.length;
}

var keyUpHandlers = function(e){
    // only if the entry area is being used - could I use focus?
    if ( !e.target.classList.contains('entry-area')){ return }
    // get the num of characters
    countChars( e.target.value );
    // don't even bother counting words if the space key is used
    if ( e.keyCode != 32 ) {
        countWords( e.target.value );
    }
}


document.addEventListener('keyup', keyUpHandlers, false)