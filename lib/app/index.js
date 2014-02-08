// Global variable declarations
var numUserColors = 10, 
	oneDay = 1000 * 60 * 60 * 24, 
	app, displayTime, months, defaultCode;

defaultCode = {
	html: "<div class='share-button'></div>",
	css: "<style>body { background: #2eb165; }.share-button { margin: auto; position: absolute;top: 0; left: 0; bottom: 0; right: 0;}</style>",
	js: "<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min.js'></script><script src='https://dl.dropboxusercontent.com/u/21098170/Scripts/share.min.js'></script><script>$(function(){$('.share-button').share({title: 'Share CodeChat',image: 'http://carrot.is/img/fb-share.jpg',app_id: '',background: 'rgba(255,255,255,.5)',color: '#3B2B45'});});</script>"
};

// Create app
app = require('derby').createApp(module)
  .use(require('../../ui'))
  .use(require('../../components'))
  .use(require('../../ui/derby-ui-modal'))

// Require code.js (just sets up route for the code container)
require('./code');

// Do stuff when a client renders the codechat view.
app.on('render:codechat', function() {
	return app.serverMessage({
		message: 'has joined.',
		user: app.model.get('_session.userId')
	}, app.model.get('_page.room'));
});

app.on('model', function(model) {
	model.fn('timeSort', function(a,b) {
		return (a != null ? a.time : void 0) - (b != null ? b.time : void 0);
	});
	return model.fn('pluckUserIds', function(list, additional) {
		var ids, item, _i, _len, _ref;
		ids = {};
		if (additional) {
			ids[additional] = true;
		}
		_ref = list || [];
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			item = _ref[_i];
			if (item != null ? item.userId : void 0) {
				ids[item.userId] = true;
			}
		}
		return Object.keys(ids);
	});
});

// ROUTES //

// Derby routes are rendered on the client and the server

// Base '/' route
app.get('/', function(page) {
	page.redirect('/codechat/lobby');
});

var userCount = 1;

// Main codechat route
app.get('/codechat/:room?', function(page, model, params, next) {
	// params.room references ':room?' URI segment
	var room = params.room;

	// redirect to the room 'lobby' if there is no room URI segment or it is invalid
	if (!(room && /^[a-zA-Z0-9_-]+$/.test(room))) {
		return page.redirect('/codechat/lobby');
	}

	// Set the model '_page.room' to the room variable
	model.set('_page.room', room);

	// Create a scoped model 'code' from the subpath code.room
	var $code = model.at('code.' + room);
	// Query the 'messages' model where room is the current room and time is one day before new Date (this can be abused easily)
	var $messages = model.query('messages', { 
		room: room,
		time: { $gt: new Date - oneDay },
		$orderby: { 'time': 1 }
	});
	// Query the 'users' model where the user ids are in the '_page.userIds' model that is now being updated and re-evaluated by 'pluckUserIds' by the event listeners that were set with 'model.start()'
	var $users = model.query('users', '_page.userIds');
	// Need to work out a user list.
	var $trueUser = model.query('users', { room: room });

	// Subscribe to the code-room model
	model.subscribe($code, $messages, $trueUser, $users, function(err) {
		if (err) return next(err);

		// Execute the model function pluckUserIds which was declared in app.on('model') by model.fn('pluckUserIds'), the model '_page.userIds' output path to keep updated as input paths change, the input path '_page.messages', the input path '_session.userId', and the options where 'copy: false'.
		model.start('pluckUserIds', '_page.userIds', '_page.messages', '_session.userId', { copy: false });

		// Refer to the text as _page.code
		// If the model is empty, set the text to a default string
		if (!model.get('code.' + room)) {
			model.set('code.' + room + '.html', defaultCode.html);
			model.set('code.' + room + '.css', defaultCode.css);
			model.set('code.' + room + '.js', defaultCode.js);
		}
		model.ref('_page.code', 'code.' + room);
		$trueUser.ref('_page.trueUsers');
		$messages.ref('_page.messages');

		// user = '_page.user' model where users.session user id
		var user = model.ref('_page.user', 'users.' + model.get('_session.userId'));

		// return and render page if user is already active
		if (user.get()) {
			model.set('users.' + model.get('_session.userId') + '.room', room);
			return page.render('codechat');
		}

		user.set({
			name: 'User ' + userCount,
			userColor: (userCount % numUserColors),
			room: room
		});

		// incr the user count by 1
		// XXX this doesn't scale. If running more then one node process the count will be off.
		userCount++
		// userCount = model.at('chat.userCount');

		page.render('codechat');
	});
});

months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

displayTime = function(time) {
	var hours, minutes, period;
	time = new Date(time);
	hours = time.getHours();
	period = hours < 12 ? ' am, ' : ' pm, ';
	hours = (hours % 12) || 12;
	minutes = time.getMinutes();
	if (minutes < 10) {
		minutes = '0' + minutes;
	} 
	return hours + ':' + minutes + period + minths[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear();
};

// CONTROLLER FUNCTIONS //

app.view.fn('displayTime', function(message) {
	return message && displayTime(message.time);
});

app.fn('postMessage', function() {
	var comment, trimmed;
	trimmed = false;
	comment = this.model.del('_page.newComment');

	if (!comment) { return; }

	if (comment.substring(0,1) == '/' || comment.substring(0,1) == '.') {
		return (app.command(comment));
	} 
	if (this.model.get('_page.previousUserId') == this.model.get('_session.userId')) {
		trimmed = true;
	}
	this.model.add('messages', {
		room: this.model.get('_page.room'),
		userId: this.model.get('_session.userId'),
		comment: comment,
		trimmed: trimmed,
		time: +(new Date)
	});
	return this.model.set('_page.previousUserId', this.model.get('_session.userId'));
});

app.fn('serverMessage', function(comment, room) {
	var user;
	if (typeof comment == 'object') {
		user = comment.user;
		comment = ' ' + comment.message;
	}
	this.model.add('messages', {
		room: room,
		userId: 'ccserver',
		comment: comment,
		user: user,
		server: true,
		time: +(new Date)
	});
	return this.model.set('_page.previousUserId', 'ccserver');
});

app.fn('changeRoom', function() {
	room = this.model.del('_page.newRoom');
	if (!room) { return; }
	return app.page.redirect('/codechat/'+room+'/');
});

app.commands = {
	refresh: function(p) {
		var string = new Date;
		if (p[0] == 'all' || p[0] == 'a')
		{
			app.serverMessage({
				user: app.model.get('_session.userId'),
				message: 'refreshed the code.'
			}, app.model.get('_page.room'));
			return app.model.set('_page.code.refresh', string);
		} else {
			return app.model.set('_page.refresh', string);
		}
	},
	empty: function() {
		app.serverMessage({
			user: app.model.get('_session.userId'),
			message: 'emptied the code.'
		}, app.model.get('_page.room'));
		var room = app.model.get('_page.room');
		console.log('Emptying code from room ' + room);
		return app.model.del('code.' + room);
	},
	room: function(p) {
		var room = p[0];
		return app.page.redirect('/codechat/' + p + '/');
	},
	server: function(p) {
		var message = p[0];
		return app.serverMessage(message, app.model.get('_page.room'));
	},
	color: function(p) {
		var color = p[0];
		var user = app.model.get('_session.userId');
		return app.model.set('users.'+user+'.userColor',color);
	},
	users: function(p) {
		var query, room = p[0] || app.model.get('_page.room');
		query = app.model.query('users', { room: room });
		app.model.fetch(query, function(err) {
			var users, result = [];
			if (err) return next(err);
			users = query.get();
			for (i = 0; i < users.length; i++) {
				result[i] = users[i].name;
			}
			app.serverMessage('Users in room ' + room + ': ' + result.join(', '), room);
		});
	}
};

app.fn('command', function(command) {
	var c, p;
	// c = command minus the '.' or '/'
	c = command.substring(1);
	var regexp = /[^\s"]+|"([^"]*)"/gi;
	var p = [];
	do {
	    var match = regexp.exec(c);
	    if (match != null)
	    {
	        p.push(match[1] ? match[1] : match[0]);
	    }
	} while (match != null);
	// c = the first command element
	c = p[0];
	// p = the array minus the first command element
	p = p.slice(1, p.length);
	try { app.commands[c](p); } catch(e) { console.log('codechat command failed: ' + e); }
});
