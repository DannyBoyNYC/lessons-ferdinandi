var lunch = {
  sandwich: 'turkey',
  chips: 'cape cod',
  drink: 'soda',
};

// duplicate object
var moreLunch = lunch;

console.log(moreLunch);

// Remove "chips" from original object
delete lunch.chips;

// duplicate object is affected
console.log(moreLunch);
