const http = require('http')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var MailDev = require('maildev');

var maildev = new MailDev();

const Block = require('./api/models/blockModel');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Coursnodedb');


const blockRoutes = require('./api/routes/blockRoutes');
const userRoutes = require('./api/routes/userRoutes');
blockRoutes(app);
userRoutes(app);

const hostname = '127.0.0.1';
const port = 3000;
maildev.listen();
app.listen(port, hostname);
