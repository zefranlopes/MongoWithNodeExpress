const db = require('../db');
const schema = new db.Schema({
	name:{
		type: String,
		require: true,
	},
	ts:{
		type: Date,
		default: Date.now,
	},
	user:[{
		type: db.Schema.Types.ObjectId,
		ref: user,
	}],
	task:[{
		type: db.Schema.Types.ObjectId,
		ref: task,
	}],
});
const project = db.model('project', schema);
module.exports = project;