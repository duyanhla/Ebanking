var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var userCtrl = require('./controllers/userController');
var cardCtrl = require('./controllers/cardController');
var verifyAccessToken = require('./repos/authRepo').verifyAccessToken;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// app.use(express.static(__dirname + "./../client"));
app.use('/user', userCtrl);
app.use('/card', verifyAccessToken, cardCtrl);

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Site running on port 3000');
});
