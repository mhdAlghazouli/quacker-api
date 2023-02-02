var express = require('express');
var path = require('path');
var multer = require('multer')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const cors = require('cors');

const corsOptions = {
  origin: 'https://quacker.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
  'Origin, X-Requested-With, Content-Type, Accept',
};

//https://quacker.onrender.com



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile');
var postRouter = require('./routes/posts');
var followRouter = require('./routes/follows');
var likeRouter = require('./routes/likes');
var commentRouter = require('./routes/comments');
var productRouter = require('./routes/products');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/Images',express.static(path.join(__dirname, 'public/Images')));
app.use(cors(corsOptions));

//static images folder
app.use(express.static('Images'))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/posts', postRouter);
app.use('/follows', followRouter);
app.use('/likes', likeRouter);
app.use('/comments', commentRouter);
app.use('/products', productRouter);



module.exports = app;
