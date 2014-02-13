// The init function is called on both the server and browser
// before rendering
exports.init = function(model) {
	var self = this;
}

// The create function is called after the component is created
// and has been added to the DOM. It only runs in the browser
exports.create = function(model, dom) {
	var el, self = this;

	el = dom.element('codepanel');

	textarea = $(el).children('textarea');

	textarea.focus(function() {
		$(this)
			.removeClass('js-codeInactive')
			.addClass('js-codeActive');

		$(this).siblings()
			.removeClass('js-codeActive')
			.addClass('js-codeInactive');
	});

	textarea.keydown(function(e) {
		var keyCode = e.keyCode || e.which;
		if (keyCode == 9) {
			e.preventDefault();
			var start = $(this).get(0).selectionStart;
			var end = $(this).get(0).selectionEnd;
			$(this).val($(this).val().substring(0, start)
				+ "    " 
				+ $(this).val().substring(end));
			$(this).get(0).selectionStart = $(this).get(0).selectionEnd = start + 4;
		}
	});
}