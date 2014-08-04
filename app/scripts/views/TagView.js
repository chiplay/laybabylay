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