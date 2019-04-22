const http = require('http')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Block = require('./api/models/blockModel');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Coursnodedb');

const routes = require('./api/routes/blockRoutes');
routes(app);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname);
