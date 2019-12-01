var lunch = {
  sandwich: 'turkey',
  chips: 'cape cod',
  drink: 'soda',
};

// IMMUTABLE

// Create an immutable copy of the original array
var evenMoreLunch = Object.assign({}, lunch);

// Add a snack to the original object
lunch.snack = 'cookies';

// Logs with the new SNACK property
console.log(lunch);

// Logs originally assigned object
console.log(evenMoreLunch);
