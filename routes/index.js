var express = require('express');
var router = express.Router();

var quizController= require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);

// Definición de rutas de /quizzes
router.get('/quizzes', quizController.index);
router.get('/quizzes/:quizId(\\d+)', quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizzes/new', quizController.new);
router.post('/quizzes/create', quizController.create);

router.get('/author', function(req, res) {
	res.render('author', { author: 'Mauro D.S.' });
});

module.exports = router;
