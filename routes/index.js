var express = require('express');
var router = express.Router();

var quizController= require('../controllers/quiz_controller');

/* GET home page. */


router.get('/', function(req, res) {
	res.render('index', { title: 'Quiz' });
});

router.get('/quizzes', quizController.index);
router.get('/quizzes/:quizId(\\d+)', quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);

router.get('/author', function(req, res) {
	res.render('author', { author: 'Mauro D.S.' });
});

module.exports = router;
