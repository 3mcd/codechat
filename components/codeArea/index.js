// The init function is called on both the server and browser
// before rendering
exports.init = function(model) {
	var self = this;
};

// The create function is called after the component is created
// and has been added to the DOM. It only runs in the browser
exports.create = function(model, dom) {
	var checkbox, actions, path, p, area, self = this;

	

	path = model.get('path');
	p = app.model.at(path);
	model.ref('_path', p);

	actions = model.get('actions');
	var a = this.a = model.at('a');

	checkbox = dom.element('checkbox');

	if (actions) {
		actions = actions.split(' ');
		for (i = 0; i < actions.length; i++) {
			var value = actions[i];
			a.push({
				fn: value,
				name: value.charAt(0).toUpperCase() + value.slice(1)
			});
		}
	}

	area = dom.element('area');

	$(checkbox).prop('checked', true);

	$(checkbox).change(function() {
		$(area).toggleClass('js-flex-0');
	});
};

exports.actions = {
	run: function() {
		app.commands.refresh(['all']);
	},
	empty: function(type) {
		app.commands.empty(['code', type]);
	}
};

exports._doAction = function(e, el) {
	var fn = el.getAttribute('data-action');
	var type = el.getAttribute('data-type');
	this.actions[fn](type);
};