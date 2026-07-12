const express = require('express');
const app = express();
const users = [
  { id: 1, name: "Okonkwo", age: 59 },
  { id: 2, name: "Amarachi", age: 14 },
  { id: 3, name: "Smith", age: 36 }
];

app.get('/', (req, res) => {
	res.send("Welcome to the homepage!")
});
app.get('/users/:id', (req, res) => {
	const id = Number(req.params.id);
	const user = users.find(u => u.id === id);

	if (user) {
		res.json(user);
	} else {
               res.status(404).json({error: "User not found"});
	}
});	


app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
