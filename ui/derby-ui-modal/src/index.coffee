exports.create = (model, dom) ->
  self = this
  dom.addListener document, "keydown", (e) ->
    # Escape
    if model.get('keydown') and model.get('show')
      self.close "escape" if e.keyCode is 27

exports.show = ->
  @model.set "show", true

exports.close = (action) ->
	@model.pass({ action: action }).set("show", false)

exports._click = (e) ->
  action = e.target.getAttribute("data-action")
  @close action if action