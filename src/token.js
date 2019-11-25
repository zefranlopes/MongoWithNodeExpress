const jwt = require('jsonwebtoken');
const auth = require('./middlewares/auth');

module.exports = (req, res, next) => {
	try{
		const authenticate = req.headers.authorization;
		if (!authenticate)
			return res.status(400).send({error: 'Token is not informed.'});		
		parts = authenticate.split(' ');
		if (!parts.length === 2)
			return res.status(400).send({error: 'Token out of scheme.'});
		const [ scheme, token ] = parts;
		if (!/^Bearer$/i.test(scheme))
			return res.status(400).send({error: 'Token is not scheme.'});
		jwt.verify(token, auth.secret, (err, dec) => {
			if (err)
				return res.status(400).send({error: 'Token is not valid.'});
			req.Token = dec.token;
		});
		return next();		
	}catch (e) {
		return res.status(500).send({error: e.message, stack: e.stack});
	}
};