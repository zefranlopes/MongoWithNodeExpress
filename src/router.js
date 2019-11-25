const fs = require('fs');
const path = require('path');


module.exports = app => {
	fs
		.readdirSync('./controllers/')
		.forEach(file => require(path.resolve('./controllers/', file))(app));
};