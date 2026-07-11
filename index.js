let users = [
	{ id: 1, name: "Okonkwo", age: 59 },
	{ id: 2, name: "Amarachi", age: 14 },
	{ id: 3, name: "Smith", age: 36 }
]
console.log(users)

users.forEach((user) => {
	console.log(`User is ${user.name}. User is ${user.age} years old.`)
});
let adults = users.filter(user => {
	return user.age >= 18
});
let names = users.map(user => {
	return user.name
});

console.log(adults)
console.log(names)
