define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'hbar!templates/tag'
], function($, _, Backbone, Marionette, vent, tagTpl){

	return Marionette.ItemView.extend({

		template: tagTpl,

		className: 'tag',

		tagName: 'li',

		bindings: {
			'a': {
				observe: 'title',
				updateMethod: 'html',
				attributes: [{
					observe: 'selected',
					name: 'class',
					onGet: function(val) {
						return val ? 'active' : '';
					}
				}]
			}
		},

		events: {
			'click a': 'filter'
		},

		initialize: function(options) {
			this.options = options || {};
		},

		onDomRefresh: function() {
			this.stickit();
			this.setState();
		},

		setState: function() {
			var searchModel = vent.request('search:model'),
					category;

			if (searchModel.defaultData.type === 'post') {
				category = searchModel.defaultData.category;
			} else if (searchModel.defaultData.type === 'product') {
				category = searchModel.defaultData.product_type;
			} else {
				category = searchModel.defaultData.tags;
			}
			if (this.model.get('slug') === category) {
				this.model.select();
			} else {
				this.model.deselect();
			}
		},

		filter: function(ev) {
			ev.preventDefault();
			var category = this.model.get('slug'),
					type = this.model.get('post_type'),
					tags = null,
					url = '';

			if (this.model.get('selected')) {
				this.model.deselect();
				vent.execute('search:remove:category',category);
				category = null;
			} else {
				this.model.select();
			}

			vent.trigger('search:update:type', type);

			if (type === 'all') {
				type = ['post','product'];
			} else if (type === 'styleboard') {
				type = 'post';
				tags = category;
				category = 'style-boards';
			}

			url = vent.request('fetch:url', type, category, tags, null);
			vent.execute('navigate','/search/' + url, true);
		}

	});

});