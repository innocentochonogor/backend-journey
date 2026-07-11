const user = {
	name: "Innocent",
	age: 42,
	email: "innocentochonogor@gmail.com"
}
console.log(`My name is ${user.name}. I am ${user.age}years old. My email is ${user.email}.`);
let jsonString = JSON.stringify(user);
console.log(jsonString);
