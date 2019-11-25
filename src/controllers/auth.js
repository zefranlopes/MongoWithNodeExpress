const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const user = require('../models/user'); 
const bcjs = require('bcryptjs');
const crpt = require('crypto');

const router = express.Router();
function makeToken(params = {}){
	return jwt.sign(params, auth.secret, {expiresIn:86400});
}
router.post('/user', async (req, res) => {
	try{
		const {email} = req.body;
		if (await user(req.headers).findOne({email}))
			return res.status(400).send({error: 'User already exists.'}); 
		const data = await user(req.headers).create(req.body);
		const tkm = await makeToken({token: data.id});
		return res.send({data, token: tkm});
	}catch (err) {
		return res.status(500).send({error: e.message, stack: e.stack});
	}
});
router.post('/auth', async (req, res) => {
	try{
		const {email, pass} = req.body;
		const data = await user(req.headers).findOne({email}).select('+pass');
		if (!data)
			return res.status(400).send({error: 'User not found.'}); 
		if (!await bcjs.compare(pass, data.pass))
			return res.status(400).send({error: 'Invalid password.'}); 
		return res.send({data, token: makeToken({token: data._id})});
	}catch (e) {
		return res.status(500).send({error: e.message, stack: e.stack});
	}
});
router.post('/auth/forget', async (req, res) => {
	try{
		const {email} = req.body;
		const data = await user(req.headers).findOne({email});
		if (!data)
			return res.status(400).send({error: 'User not found.'}); 
		const token = crpt.randomBytes(20).toString('hex');
		const now = new Date();
		now.setHours(now.getHours()+1);
		await user(req.headers).findByIdAndUpdate(data.id, {
			'$set': {
				passResetToken: token,
				tsResetToken: now,
			}
		});
		return res.send({token:token, now: now});
	}catch (e) {
		return res.status(500).send({error: e.message, stack: e.stack});
	}
});
router.post('/auth/reset', async (req, res) => {
	try{
		const {email, pass, token} = req.body;
		const data = await user(req.headers).findOne({email}).select('+passResetToken tsResetToken');
		if (!data)
			return res.status(400).send({error: 'User not found.'}); 
		if (token != data.passResetToken)
			return res.status(400).send({error: 'Token incorret.'}); 
		const now = new Date();
		if (now > data.tsResetToken)
			return res.status(400).send({error: 'Token experied.'}); 
		data.pass = pass;
		await data.save();	
		return res.send();
	}catch (e) {
		return res.status(500).send({error: e.message, stack: e.stack});
	}
});

module.exports = app => app.use('/', router);