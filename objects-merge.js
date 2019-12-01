var lunch = {
  sandwich: 'turkey',
  chips: 'cape cod',
  drink: 'soda',
};

var dinner = {
  meat: 'horse',
  veg: 'peas',
  drink: 'wine',
};

// Merge arrays - shallow - no wine
var food = Object.assign(dinner, lunch);
food;
// mutated
dinner;
// not mutated
lunch;
// Add a snack to lunch
lunch.snack = 'cookies';
// Logs with the new SNACK property
lunch;
dinner.desert = 'ice cream';
// No snack, adds ice cream
food;
