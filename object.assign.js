var object1 = {
  apple: 0,
  banana: {
    weight: 52,
    price: 100,
  },
  cherry: 97,
};

var object2 = {
  banana: {
    price: 200,
  },
  durian: 100,
};

var object3 = {
  apple: 'yum',
  pie: 3.214,
  applePie: true,
};

// In this example, "banana" will only contain {price: 200}
// In a deep merge, it would contain {price: 200, weight: 52}
// var merged = Object.assign(object1, object2, object3); //?

var mergedNewObj = Object.assign({}, object1, object2, object3); //?
