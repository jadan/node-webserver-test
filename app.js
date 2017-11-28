
// Load required libraries (express and handlebar JS)
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Heroku setup. 
const port = process.env.PORT || 3000;

var app = express();

//Middleware order is important, in this case: logger, mantainance, public directory
//More middleware. 
app.use((req, res, next)=>{
	var now = new Date().toString();
	var log = `${now}:${req.method}:${req.url}`;
	fs.appendFile('server.log', log+'\n',(err)=>{if (err){console.log('error');}});
	//need to call next in order to allow server to continue loading 
	next();
});

// //More middleware.
// app.use((req, res, next)=>{
// 	res.render('mantainance.hbs');
// });

//Middleware (express) Third-party add-on. 
app.use(express.static(__dirname+'/public'));


//Set up partials (reuse HTML headers)
hbs.registerPartials(__dirname+'/views/partials');

//Set up helpers.
hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});

//Setup handlebars and express.
app.set('view engine', 'hbs');

// app.get('/', (req, res)=>{
// 	// res.send('<h1>Hello express.</h1>');
// 	res.send({
// 		name: 'String',
// 		likes : ['Biking', 'Cities']
// 	})
// });
app.get('/about', (req, res)=>{
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/projects', (req, res)=>{
	res.render('projects.hbs', {
		pageTitle: 'Projects Page',
	});
});

app.get('/', (req, res)=>{
	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'Welcome message!',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res)=>{
	res.send({
		errorMessage: 'Error handling request'
	});
});
app.listen(port, ()=>{console.log('Server is up on port 3000.')});