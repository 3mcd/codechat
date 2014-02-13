// The init function is called on both the server and browser
// before rendering
exports.init = function(model) {
    var self = this;         
};

// The create function is called after the component is created
// and has been added to the DOM. It only runs in the browser
exports.create = function(model, dom) {        
    var self = this;
};

exports._click = function(e) {
    var el, cls, target, target_cls;
    e.preventDefault();

    el = e.target;
    cls = el.getAttribute("data-class");

    target = el.getAttribute("data-target");
    target_cls = el.getAttribute("data-target-class");
    
    this.toggle(el, cls);
    return this.target(target, target_cls);
};

exports.toggle = function(el, cls) {
    return $(el).toggleClass(cls);
}

exports.target = function(target, cls) {
    return $('.' + target).toggleClass(cls);
}