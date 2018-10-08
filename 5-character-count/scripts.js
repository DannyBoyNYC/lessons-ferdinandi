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
    // run only if the entryArea is being used
    if (!e.target.id === 'entryArea'){ return }
    countChars( e.target.value );
    // don't even bother running countWords if the space key is used
    if ( e.keyCode != 32) {
        countWords( e.target.value );
    }
}


document.addEventListener('keyup', keyUpHandlers, false)