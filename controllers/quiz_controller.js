var models= require('../models/models.js');

exports.create= function(req, res) {
	var quiz= models.Quiz.build(req.body.quiz);

	quiz
	.validate()
	.then(
		function(err){
			if (err) {
				res.render('quizzes/new', {quiz: quiz, errors: err.errors});
			} else {
				quiz.
				save({ fields: ["pregunta", "respuesta"]})
				.then(function(){ res.redirect('/quizzes')})
			}
		}
	);
};

exports.new= function(req, res) {
	var quiz= models.Quiz.build(
		{ pregunta: 'Pregunta', respuesta: 'Respuesta'}
	);
	res.render('quizzes/new', { quiz: quiz, errors: [] });
};

// Autoload - Factoriza el código si ruta incluye :quizId
exports.load= function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(
		function(quiz){
			if(quiz) {
				req.quiz= quiz;
				next();
			}else { next(new Error('No existe quizId=' + quizId)); }
		}
	).catch(function(error) { next(error); });
};

// GET /quizzes
exports.index= function(req, res) {
	models.Quiz.findAll().then(
		function(quizzes){
			res.render('quizzes/index', { quizzes: quizzes, errors: [] });
		}
	).catch(function(error) { next(error); });
};

// GET /quizzes/:Id
exports.show= function(req, res) {
	res.render('quizzes/show', { quiz: req.quiz, errors: [] });
};

// GET /quizzes/:Id/answer
exports.answer= function(req, res) {
	var resultado= 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado= 'Correcto';
	}
	res.render('quizzes/answer', { quiz: req.quiz, respuesta: resultado, errors: [] });
};