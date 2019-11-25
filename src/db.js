const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
const db = mongoose.createConnection('mongodb://127.0.0.1/', {
	useCreateIndex: true,
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useFindAndModify: false,
	autoReconnect: true,
	connectTimeoutMS: 200000,
	socketTimeoutMS: 200000,
	keepAlive: true,
	keepAliveInitialDelay: 100000,
	poolSize: 100
});
db.setMaxListeners(0);
db.Schema = mongoose.Schema
db.Promise = global.Promise;
module.exports = db;