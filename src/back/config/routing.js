var homeController = require('../src/controllers/HomeController');

module.exports = routing = {

	'/' : {
		get : homeController.home
	}

}
