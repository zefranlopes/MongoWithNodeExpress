const bc = require('bcryptjs');
const db = require('../db');

module.exports = function (h) {
    
	const schema = new db.Schema({
		name:{
			type: String,
			require: true,
		},
		email:{
			type: String,
			unique: true,
			require: true,		
			uppercase: true,
		},
		pass:{
			type: String,
			require: true,
			select: false,
		},
		ts:{
			type: Date,
			default: Date.now,
		},
		passResetToken:{
			type: String,
			require: true,
			select: false,
		},
		tsResetToken:{
			type: Date,
			select: false,
		},
	});
	schema.pre('save', async function(next){
		this.pass = await bc.hash(this.pass, 10);
		next();
	});
	return db.useDb(h['datawarehouse']).model('user', schema);
};

