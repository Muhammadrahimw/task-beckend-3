const jwt = require("jsonwebtoken");

const token = jwt.sign({id: 1}, "Key", {expiresIn: "10s"});

console.log(token);

jwt.verify(
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM5OTk1MTc2LCJleHAiOjE3Mzk5OTUxODZ9.mcnm5yEajwi80chXnyvETcsXoZvqilHIk-YDmkZRDcE",
	"Key",
	(errors, encode) => {
		try {
			console.log(encode);
		} catch (error) {
			console.log(errors);
		}
	}
);
