// Variables
let name = "Innocent";
const role = "Backend Developer";

// Template literals (string interpolation)
console.log(`Hello, ${name}! You're learning to be a ${role}.`);

// Function
function addNumbers(a, b) {
  return a + b;
}

console.log("2 + 3 =", addNumbers(2, 3));

// Arrow function (modern JS style — used constantly in Node)
const multiply = (a, b) => a * b;
console.log("4 * 5 =", multiply(4, 5));

// Arrays and loops
const languages = ["JavaScript", "Python", "Go"];
languages.forEach((lang) => {
  console.log(`I could learn ${lang}`);
});
