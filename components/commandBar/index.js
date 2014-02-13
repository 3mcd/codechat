// The init function is called on both the server and browser
// before rendering
exports.init = function(model) {
    var self = this;         
}

// The create function is called after the component is created
// and has been added to the DOM. It only runs in the browser
exports.create = function(model, dom) {        
    var self = this;

    this.input = dom.element('commandline');

    this.history = app.model.get('users.' + app.model.get('_session.userId') + '.history');
    this.cursor = this.history.length;

    $(this.input).keydown(function(e) {
    	if (e.keyCode == 13) {
    		self.history = app.model.get('users.' + app.model.get('_session.userId') + '.history');
    		self.cursor = self.history.length + 1;
    	} else if (e.keyCode == 38) {
    		e.preventDefault();
    		self.cursor = (self.cursor - 1) > 0 ? self.cursor - 1 : self.history.length;
    		$(this).val(self.history[self.cursor]);
    	} else if (e.keyCode == 40) {
    		e.preventDefault();
    		$(this).val(self.history[self.cursor + 1]);
    		self.cursor = (self.cursor + 1) > self.history.length ? 0 : self.cursor + 1;
    	}
    });
}