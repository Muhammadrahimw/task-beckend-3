const fs = require("node:fs");
const path = require("node:path");

const write = (dir, data) => {
	fs.writeFileSync(
		path.resolve(".", "module", `${dir}.json`),
		JSON.stringify(data, null, 4)
	);
};

const read = (dir) => {
	return JSON.parse(
		fs.readFileSync(path.resolve(".", "module", `${dir}.json`))
	);
};

module.exports = {write, read};
