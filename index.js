const express = require('express');
const app = express();
app.use(express.json()); // middleware: parses incoming JSON request bodies

const users = [
  { id: 1, name: "Okonkwo", age: 59 },
  { id: 2, name: "Amarachi", age: 14 },
  { id: 3, name: "Smith", age: 36 }
];

app.get('/users', (req, res) => {
	res.json(users);
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
app.post('/users', (req, res) => {
	const newUser = {
		id: users.length + 1,
		name: req.body.name,
		age: req.body.age
		};
	users.push(newUser);
	es.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index !== -1) {
    users[index] = { id: id, name: req.body.name, age: req.body.age };
    res.json(users[index]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
