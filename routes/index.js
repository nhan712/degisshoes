/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	// Views
	app.get('/', middleware.index, routes.views.index);
	app.get('/blog/:category?', middleware.blog, routes.views.blog);
	app.get('/blog/post/:post', middleware.blog, routes.views.post);
	app.get('/gallery', middleware.gallery, routes.views.gallery);
	app.all('/contact', middleware.contact, routes.views.contact);
	app.get('/shop', middleware.shop, routes.views.shop);
	app.get('/shop/login', routes.views.signin);
	app.post('/shop/login', function(req, res) {
		var User = keystone.list(keystone.get('user model'));
		User.model.findOne({ email: req.body.email }).exec(function(err, user) {
			if (user) {
				user._.password.compare(req.body.password, function(err, isMatch) {
					if (!err && isMatch) {
						res.send('success');
					} else {
						res.send('fail');
					}
				});
			} else {
				res.send('fail');
			}
		});
	});
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
