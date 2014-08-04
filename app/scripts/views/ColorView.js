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
					},
					{
						observe: 'selected',
						name: 'class',
						onGet: function(val) {
							return val ? 'active' : '';
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
			this.setState();
		},

		setState: function() {
			var searchModel = vent.request('search:model'),
					tag;

			if (searchModel.defaultData.type === 'post') {
				tag = searchModel.defaultData.tags;
			} else if (searchModel.defaultData.type === 'product') {
				tag = searchModel.defaultData.product_tags;
			} else {
				tag = searchModel.defaultData.tags;
			}
			if (this.model.get('slug') === tag) {
				this.model.select();
			} else {
				this.model.deselect();
			}
		},

		filter: function(ev) {
			ev.preventDefault();
			var tag = this.model.get('slug'),
					url = '';

			if (this.model.get('selected')) {
				this.model.deselect();
				vent.execute('search:remove:tag',tag);
				tag = null;
			} else {
				this.model.select();
			}
			url = vent.request('fetch:url', null, null, tag, null);
			vent.execute('navigate','/search/' + url, true);
		}

	});

});