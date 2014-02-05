// Global variable declarations

// Create app
app = require('./index.js');


// ROUTES //

// Derby routes are rendered on the client and the server

// Base '/' route
app.get('/code/:room?', function(page, model, params, next) {
	var room = params.room;

	if (!(room && /^[a-zA-Z0-9_-]+$/.test(room))) {
		return page.redirect('/code/lobby');
	}

	var code = model.at('code.' + room);

	// Subscribe to the code-room model
	code.subscribe(function(err) {
		if(err) { return next(err); }
		// Refer to the text as _page.code
		// If the model is empty, set the text to a default string
		model.ref('_page.code', 'code.' + room + '.text');
	});

	page.render('code');
});

// CONTROLLER FUNCTIONS //