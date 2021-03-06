
/*
Importar paquetes con middlewares
*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials= require('express-partials');
var methodOverride= require('method-override');
var session= require('express-session');

/*
Importar enrutadores
*/
var routes = require('./routes/index');

// Crear aplicación
var app = express();

// view engine setup. Instalar generador de vistas EJS.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// Instalar los middlewares importados
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Helpers dinámicos
app.use(function(req, res, next) {

  // guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});

// Auto-logout de sesión
app.use(function(req, res, next) {
    if (req.session.user) {
      if (Date.now() - req.session.user.lastRequestTime > 2*60*1000) {
        delete req.session.user;
      } else {
        req.session.user.lastRequestTime = Date.now();
      }
    }
    next();
  });

// Instalar los enrutadores importados
app.use('/', routes);

// catch 404 and forward to error handler
// Instalar middleware para resto de rutas. Generará error 404 de HTTP.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// Manejador de errores durante la fase de desarrollo.
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors: []
    });
  });
}

// production error handler
// no stacktraces leaked to user
// Manejador de errores durante la fase de producción.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors: []
  });
});


module.exports = app;
