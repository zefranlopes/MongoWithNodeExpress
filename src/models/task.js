const db = require('../db');
const schema = new db.Schema({
	name:{
		type: String,
		require: true,
	},
	event:{
		type: String,
		require: true,
	},
	ts:{
		type: Date,
		default: Date.now,
		require: true,
	},
	next:{
		type: Date,
		require: true,
	},
	seq:{
		type: String,
		require: true,
	},
	complete:{
		type: Boolean,
		require: true,
	},
	message:{
		type: String,
	}
});
const task = db.model('task', schema);
module.exports = task;