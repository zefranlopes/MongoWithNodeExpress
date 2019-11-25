const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./router')(app);

app.listen(3030);