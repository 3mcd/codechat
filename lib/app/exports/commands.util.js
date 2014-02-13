var snippets = require('./snippets.util').util;

function util() {    

    var self = this;

    this.refresh = function(p) {
        var string = new Date;
        if (p[0] == 'all' || p[0] == 'a')
        {
            app.serverMessage({ message: 'refreshed the code.' }, app.model.get('_page.room'));
            return app.model.set('_page.code.refresh', string);
        } else {
            return app.model.set('_page.refresh', string);
        }
    };

    this.start = function(p) {
        var s, start, room = app.model.get('_page.room');

        var Compilation = function(obj) {
            this.name = obj.name;
            this.base = obj.base;
            this.additions = [];
            this.add = function(addition) {
                return this.additions.push(addition + '\n');
            };
            this.merge = function() {
                if (this.additions.length > 0) {
                    return this.additions.join('');
                } else {
                    return this.base;
                }
            }
        };

        start = {};
        s = [];

        start.css = new Compilation({ name: 'css', base: '<style></style>' });
        start.html = new Compilation({ name: 'html', base: '<div></div>' });
        start.js = new Compilation({ name: 'js', base: '<script></script>' });

        for (i = 0; i < p.length; i++) {
            if (snippets.list.hasOwnProperty(p[i])) {
                var snippet = snippets.list[p[i]];
                start[snippet.type].add(snippet.include);
                s.push(snippet.description);
            }
        }

        app.model.setEach('_page.code', {
            css: start.css.merge(),
            html: start.html.merge(),
            js: start.js.merge()
        },function() {
            self.refresh(['all']);
        });

        message = s.length > 0 ? ' using ' + s.join(', ') + '.': '.';

        return app.serverMessage({ message: 'started a project' + message}, room);
    };

    this.empty = function(p) {
        var room, query, type = p[0];
        room = app.model.get('_page.room');
        if (type == 'code') {
            app.model.setEach('_page.code', { css: '', html: '', js: ''}, function() {
                app.serverMessage({ message: 'emptied the code.'}, room);
                return self.refresh(['all']);
            });
        } else if (type == 'chat') {
            query = app.model.query('messages', { room: room });
            app.model.fetch(query, function(err) {
                var messages;
                if (err) return next(err);
                messages = query.get();
                for (i = 0; i < messages.length; i++) {
                    app.model.del('messages.' + messages[i].id);
                }
                return app.serverMessage({ message: 'emptied the chat.'}, room);
            });
        }
    };

    this.room = function(p) {
        var room = p[0];
        return app.page.redirect('/codechat/' + p + '/');
    };

    this.server = function(p) {
        var message = p[0];
        return app.serverMessage(message, app.model.get('_page.room'));
    };

    this.color = function(p) {
        var color = p[0];
        var user = app.model.get('_session.userId');
        return app.model.set('users.' + user + '.userColor', color);
    };

    this.users = function(p) {
        var query, room = p[0] || app.model.get('_page.room');
        query = app.model.query('users', { room: room });
        app.model.fetch(query, function(err) {
            var users, result = [];
            if (err) return next(err);
            users = query.get();
            for (i = 0; i < users.length; i++) {
                result[i] = users[i].name;
            }
            app.serverMessage('Users in room ' + room + ': ' + result.join(', '), room);
        });
    };

    this.about = function() {
        // Reveal about modal.
        app.modal.aboutDialog.show();
    };

    this.commands = function() {
        // Reveal commands modal.
        app.modal.commandDialog.show();
    }

};

exports.util = new util();