function util() {    

    var self = this;

    this.list = {
        /* CSS */
        normalize: {
            type: 'css', 
            include: '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.0/normalize.min.css">',
            description: 'Normalize CSS'            
        },
        /* HTML */
        canvas: {
            type: 'html', 
            include: '<canvas></canvas>',
            description: 'a canvas element'
        },
        layout: {
            type: 'html', 
            include: '<div class="container">\n'+'\t<header>'+'</header>\n'+'\t<footer>'+'</footer>\n'+'</div>',
            description: 'a small semantic HTML layout'
        },
        /* JS */
        jquery: {
            type: 'js', 
            include: '<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>',
            description: 'jQuery'
        },
        zepto: {
            type: 'js', 
            include: '<script src="//cdnjs.cloudflare.com/ajax/libs/zepto/1.1.2/zepto.min.js"></script>',
            description: 'Zepto'
        },
        three: {
            type: 'js', 
            include: ' <script src="//cdnjs.cloudflare.com/ajax/libs/three.js/r61/three.min.js"></script>',
            description: 'ThreeJS'            
        }
    };
};

exports.util = new util();