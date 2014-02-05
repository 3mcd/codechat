// The init function is called on both the server and browser
// before rendering
exports.init = function(model) {
    var self = this;         
}

// The create function is called after the component is created
// and has been added to the DOM. It only runs in the browser
exports.create = function(model, dom) {        
    var self = this;

    model.ref('_messages', 'messages');

    this.window = dom.element('chatwindow');

    this.scrollBottom = function() {
    	self.window.scrollTop = self.window.scrollHeight;
    };

    model.on('all', '_messages', function() {
    	self.scrollBottom();
    });

    this.scrollBottom();
}

