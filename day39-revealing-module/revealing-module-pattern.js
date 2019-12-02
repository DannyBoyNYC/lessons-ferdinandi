var da = (function() {
  //
  // Variables
  //

  var wizards = ['Harry Potter', 'Hermione', 'Neville', 'Ron'];

  var spells = {
    expel: 'Expelliarmus',
    fetch: 'Accio',
    float: 'Wingardium Leviosa',
    stun: 'Stupefy',
    patronus: 'Expecto Patronum!',
  };

  // Holds our public methods
  var methods = {};

  //
  // Methods
  //

  /**
   * Copy an array
   * @param  {Array} arr The original
   * @return {Array}     A copy
   */
  var copy = function(arr) {
    return arr.slice();
  };

  /**
   * Get an immutable copy of the wizards
   * @return {Array} The wizards
   */
  methods.getWizards = function() {
    return copy(wizards);
  };

  /**
   * Cast a spell
   * @param  {String} spell The spell ID
   */
  methods.castSpell = function(spell) {
    console.log(spells[spell]);
  };

  /**
   * Have ever wizard cast a spell
   * @param  {String} spell The spell ID
   */
  methods.allWizardsCast = function(spell) {
    wizards.forEach(function(wizard) {
      console.log(wizard + ':');
      methods.castSpell(spell);
    });
  };

  //
  // Return public methods
  //

  return methods;
})();

// da.getWizards(); //?
// da.castSpell('patronus'); //?
da.allWizardsCast('patronus'); //?
