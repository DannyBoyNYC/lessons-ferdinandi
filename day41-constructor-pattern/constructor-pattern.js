var DA = (function() {
  /**
   * Copy an array
   * @param  {Array} arr The original
   * @return {Array}     A copy
   */
  var copy = function(arr) {
    return arr.slice();
  };
  /**
   * The constructor object
   */
  var Constructor = function(wizards, spells) {
    // Assign our properties
    this.wizards = wizards;
    this.spells = spells;
  };

  /**
   * Get an immutable copy of the wizards
   * @return {Array} The wizards
   */
  Constructor.prototype.getWizards = function() {
    return copy(this.wizards);
  };

  /**
   * Cast a spell
   * @param  {String} spell The spell ID
   */
  Constructor.prototype.castSpell = function(spell) {
    console.log(this.spells[spell]);
  };

  //
  // Return the constructor
  //

  return Constructor;
})();

var army1 = new DA(['Harry Potter', 'Hermione'], {
  expel: 'Expelliarmus',
  fetch: 'Accio',
  float: 'Wingardium Leviosa',
});

var army2 = new DA(['Neville', 'Ron'], {
  stun: 'Stupefy',
  patronus: 'Expecto Patronum!',
});

// returns ['Harry Potter', 'Hermione']
army1.wizards; //?
army1.spells; //?

// returns ['Neville', 'Ron']
army2.wizards; //?

// logs "Expelliarmus"
army1.castSpell('expel'); //?

// returns ["Neville", "Ron"]
army2.getWizards();
