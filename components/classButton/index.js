// The init function is called on both the server and browser
// before rendering
exports.init = function(model) {
    var self = this;         
}

// The create function is called after the component is created
// and has been added to the DOM. It only runs in the browser
exports.create = function(model, dom) {        
    var self = this;

    target = model.get('data-target');
    targetCls = model.get('data-target-class');
    cls = model.get('class');

    this.button = dom.element('classbutton');

    this.button.addEventListener('click', function(e) {
        e.preventDefault();
    	$(self.button).toggleClass(cls);
    	$('.'+target).toggleClass(targetCls);
    });
}