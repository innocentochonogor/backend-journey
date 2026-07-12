const express = require('express');
const app = express();
app.get('/', (req, res) => {
	res.send("Welcome to the homepage!")
});
app.get('/about', (req, res) => {
	res.send("This is the about page")
});
app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
