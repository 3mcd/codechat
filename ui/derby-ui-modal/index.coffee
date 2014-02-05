config =
	filename: __filename
	ns: 'ui2'
	scripts:
		modal: require('./modal')
	styles: [__dirname]

module.exports = (app, options) ->

	app.fn 'modal.create', (modal) ->
		name = modal.model.get('name')
		if name
			# listen to change event and pass it to the main app
			modal.model.on 'change', 'show', (value, previous, passed) =>
				if value
					@model.set("_page.modal.#{name}", {})
				else
					@model.pass(passed).del("_page.modal.#{name}")

			# main app functions for showing and closing
			app.fn "modal.#{name}.show", ->
				modal.show()

			app.fn "modal.#{name}.close", (e) ->
				action = e.target.getAttribute("data-action")
				modal.close(action)

	app.createLibrary config, options

