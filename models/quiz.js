// Definición del modelo de Quiz

module.exports= function(sequelize, DataTypes){
	return sequelize.define('Quiz',
		{tema: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Hay que seleccionar un tema"}}
		},
		pregunta: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta Pregunta"}}
		},
		respuesta: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta Respuesta"}}
		}
		});
}