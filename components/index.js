var config = {
	ns: 'cc',
	styles: '../styles/components',
	filename: __filename
	, scripts: {
		editor: require('./editor'),
		chatPanel: require('./chatPanel'),
		classButton: require('./classButton'),
		codeArea: require('./codeArea'),
		commandBar: require('./commandBar')
	}
};

module.exports = function(app, options) {
	app.createLibrary(config, options);
};
