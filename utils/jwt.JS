const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const signInJwt = (params) => {
	return jwt.sign(params, process.env.SECRET_KEY, {expiresIn: "30m"});
};

module.exports = {signInJwt};
