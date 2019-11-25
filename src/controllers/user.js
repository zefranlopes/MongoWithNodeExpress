const express = require('express');
const user = require('../models/user'); 
const token = require('../token');
const router = express.Router();

router.use(token);
router.put('/user', async (req, res, next) => {
	try{
		const {email} = req.body;
		if (await user.findOne({email}))
			return res.status(400).send({error: 'User already exists.'}); 
		const data = await user.create(req.body);
		return res.send({data});
	}catch (e) {
		return res.status(500).send({error: e.message, stack: e.stack});
	}
});
module.exports = app => app.use('/', router);