var models= require('../models/models.js');

// GET /quizzes
exports.index= function(req, res) {
	models.Quiz.findAll().then(function(quizzes){
		res.render('quizzes/index.ejs', {quizzes: quizzes});
	})
};

// GET /quizzes/:Id
exports.show= function(req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizzes/show', {quiz: quiz});
	})
};

// GET /quizzes/:Id/answer
exports.answer= function(req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta) {
			res.render('quizzes/answer', {quiz: quiz, respuesta: 'Correcto'});
		}else {
			res.render('quizzes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
		}
	})
};