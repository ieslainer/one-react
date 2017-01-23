var homeController = require('../src/controllers/HomeController');
var assessmentController = require('../src/controllers/AssessmentController');

console.log("assessmentController", assessmentController);

module.exports = routing = {

	'/' : {
		get : homeController.home
	},
	'/assessment/:id':{
		get : assessmentController.getById
	}
}
