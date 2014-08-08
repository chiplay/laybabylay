define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'hbar!templates/color-swatch'
], function($, _, Backbone, Marionette, vent, colorTpl){

	return Marionette.ItemView.extend({

		template: colorTpl,

		className: 'swatch',
		tagName: 'a',

		events: {
			'click': 'filter'
		},

		bindings: {
			':el': {
				attributes: [
					{
						observe: 'color',
						name: 'style',
						onGet: function(val) {
							return 'background-color:' + val;
						}
					}
				]
			},
			'.color-title': 'color_label',
			'.paint-code': 'paint_code'
		},

		initialize: function(options) {
			this.options = options || {};
		},

		onRender: function() {
			this.stickit();
		},

		filter: function(ev) {
			ev.preventDefault();
			var tag = this.model.get('search_term');
			if (!tag) return;
			var url = vent.request('fetch:url', null, null, tag, null);
			vent.execute('navigate','/search/' + url, true);
		}

	});

});