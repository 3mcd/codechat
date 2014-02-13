function util() {    
	var self = this;

	if (typeof Object.beget !== 'function') {
		Object.beget = function (o) {
			var F = function () {};
			F.prototype = o;
			return new F();
		};
	}
};

exports.util = new util();