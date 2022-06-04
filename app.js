var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// router variables
var indexRouter = require('./routes/index');
var movieListingsRouter = require('./routes/movie_listings');
var actionmoviesRouter = require('./routes/action_movies');
var dramamoviesRouter = require('./routes/drama_movies');
var oscarmoviesRouter = require('./routes/oscar_movies');
var fourtiesmoviesRouter = require('./routes/40s_movies');
var fiftiesmoviesRouter = require('./routes/50s_movies');
var sixtiesmoviesRouter = require('./routes/60s_movies');
var seventiesmoviesRouter = require('./routes/70s_movies');
var eighttiesmoviesRouter = require('./routes/80s_movies');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/movie_listings', movieListingsRouter);
app.use('/action_movies', actionmoviesRouter);
app.use('/drama_movies', dramamoviesRouter);
app.use('/oscar_movies', oscarmoviesRouter);
app.use('/40s_movies', fourtiesmoviesRouter);
app.use('/50s_movies', fiftiesmoviesRouter);
app.use('/60s_movies', sixtiesmoviesRouter);
app.use('/70s_movies', seventiesmoviesRouter);
app.use('/80s_movies', eighttiesmoviesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
