// The init function is called on both the server and browser
// before rendering
exports.init = function(model) {
	var self = this;
}

// The create function is called after the component is created
// and has been added to the DOM. It only runs in the browser
exports.create = function(model, dom) {
	var path, self = this;

	path = model.get('path');

	title = model.get('title');
	model.set('_title', title);
	return model.ref('_code', 'path');
}