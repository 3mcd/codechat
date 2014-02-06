var config = {
	ns: 'cc',
	styles: '../styles/components',
	filename: __filename
	, scripts: {
		codeWindow: require('./codeWindow'),
		chatPanel: require('./chatPanel'),
		classButton: require('./classButton'),
		codeArea: require('./codeArea')
	}
};

module.exports = function(app, options) {
	app.createLibrary(config, options);
};
