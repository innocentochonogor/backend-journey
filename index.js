const users = [
  { id: 1, name: "Okonkwo", age: 59 },
  { id: 2, name: "Amarachi", age: 14 },
  { id: 3, name: "Smith", age: 36 }
];

function getUserById(id){
	const user = users.find(u => u.id === id)
	if(user){
		return user
	} else{
		return {error: "User not found"}
	}
}
console.log(getUserById(2));
console.log(getUserById(99));
