// The init function is called on both the server and browser
// before rendering
exports.init = function(model) {
	var self = this;
}

// The create function is called after the component is created
// and has been added to the DOM. It only runs in the browser
exports.create = function(model, dom) {
	var checkbox, area, self = this;

	checkbox = dom.element('checkbox');

	area = dom.element('area');

	$(checkbox).prop('checked', true);

	$(checkbox).change(function() {
		$(area).toggleClass('js-flex-0');
	});
}