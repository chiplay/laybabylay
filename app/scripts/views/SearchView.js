define([
  'q',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'masonry',
  'analytics',
  'models/SearchResults',
  'models/GetPage',
  'models/Post',
  'collections/Posts',
  'collections/SearchTerms',
  'views/SearchResultsView',
  'views/SearchFiltersView',
  'hbar!templates/search'

], function(q, $, _, Backbone, Marionette, vent, Masonry, analytics, SearchResults, GetPage, Post, Posts, SearchTerms, SearchResultsView, SearchFiltersView, searchTemplate){

  return Marionette.Layout.extend({

    template: searchTemplate,

    regions: {
      results: '.search-results-region'
    },

    bindings: {
      '.search-results-text span': {
        observe: ['count','count_total'],
        onGet: function(values) {
          var str = values[1],
              data = this.model.defaultData;
          // if (values[0] < values[1]) str += ' of ' + values[1];
          str += ' Result';
          if (values[0] !== 1) str += 's';
          if (data.search) str += ' for "' + data.search + '"';
          if (data.category) str += ' in "' + data.category + '"';
          if (data.product_type) str += ' in "' + data.product_type + '"';
          if (data.product_tags) str += ' tagged "' + data.product_tags.replace(/\,/g,', ') + '"';
          if (data.tags) str += ' tagged "' + data.tags.replace(/\,/g,', ') + '"';
          return str;
        }
      }
    },

    initialize: function(options){
      _.bindAll(this,'triggerReset','setSearchTerms');

      options = options || {};
      this.search = true;
      vent.trigger('search:loaded');

      this.model = vent.request('search:model');

      $('#header > div').addClass('fixed');
      vent.off('scroll:update');

      // Fetch search translations
      var page = new GetPage();
      _.extend(page.defaultData, { slug: 'search' });
      page.ready = page.fetch();
      q(page.ready).then(this.setSearchTerms).done();

      // Listen for event based queries
      this.listenTo(vent, 'search:query', this.buildQuery, this);
      this.listenTo(vent, 'search:sort', this.sortResults, this);

      vent.reqres.setHandler('search:fetch:url', this.fetchUrl, this);
      vent.commands.setHandler('search:remove:tag', this.removeTag, this);
      vent.commands.setHandler('search:remove:category', this.removeCategory, this);

      // The initial query
      this.buildQuery(options.type, options.category, options.tags, options.query );
    },

    onDomRefresh: function() {
      $('body').addClass('search');
      this.results.show( new SearchResultsView({ model: this.model }) );
      this.stickit();
    },

    onClose: function() {
      $('body').removeClass('search');
    },

    searchQuery: function(queryObj) {
      this.model.defaultData.page = 1;
      queryObj = queryObj || {};
      _.extend(this.model.defaultData, queryObj);
      this.model.get('posts').reset();
      this.model.ready = this.model.fetch();
      q(this.model.ready).then(this.triggerReset).done();

      analytics.track('Searched', {
        category: queryObj.category,
        label: queryObj.search
      });
    },

    setSearchTerms: function(resp) {
      var terms = resp.page.search_terms || [];
      this.searchTerms = new SearchTerms(terms);
    },

    triggerReset: function() {
      this.model.trigger('reset');
    },

    sortResults: function(sortVal) {
      var sort = { order_by: sortVal };
      this.searchQuery(sort);
    },

    buildQuery: function(type, category, tags, queryString) {
      queryString = queryString || '';
      type = type || 'all';
      tags = tags || '';
      category = category || null;
      var queryUrl = '',
          tagArray = [];

      // Remove the plural for posts, products, styleboards...
      if (type !== 'all') type = type.slice(0, -1);

      // Save the type to the model for our filters to key off of
      this.model.defaultData.type = (category === 'style-boards') ? 'styleboard' : type;

      if (type === 'all') type = ['post','product'];

      // Break up tags
      if (tags) tagArray = tags.split('+');

      queryString = queryString
        .replace(/q=/g,'')
        .replace(/\+/g,' ')
        .trim();

      queryUrl = this.buildUrl(type, category, tagArray, queryString);

      vent.execute('navigate', 'search/' + queryUrl);
      vent.trigger('search:update:input', queryString);

      // Translate the query
      var queryMatch = this.searchTerms && this.searchTerms.findWhere({ incorrect_term: queryString.toLowerCase() });
      if (queryMatch) queryString = queryMatch.get('replacement_term');

      queryObj = { search: queryString, post_type: type, category_exclude: null };
      if (type === 'product') {
        queryObj.product_type = category;
        queryObj.product_tags = tagArray.join('+');
      } else {
        queryObj.category = category;
        queryObj.tags = tagArray.join('+');
      }
      if (type === 'post' && category !== 'style-boards') {
        queryObj.category_exclude = 'style-boards';
      }

      this.searchQuery(queryObj);
    },

    fetchUrl: function(type, category, tag, queryString) {
      type = type || this.model.defaultData.post_type;
      category = category || this.model.defaultData.category || this.model.defaultData.product_type;
      var tagArray = [],
          tags = this.model.defaultData.tags || this.model.defaultData.product_tags || '';
      tags = tags.length ? tags.split('+') : [];

      // Add selected tags to current tag array
      if (tag && tags.length) {
        tags.push(tag);
        tagArray = tags;
      } else if (tag) {
        tagArray.push(tag);
      } else {
        tagArray = tags;
      }
      queryString = queryString !== null ? queryString : this.model.defaultData.search;
      return this.buildUrl(type, category, tagArray, queryString);
    },

    buildUrl: function(type, category, tagArray, queryString) {
      var queryUrl = '';

      // Add the plural back posts, products, styleboards...
      if (_.isArray(type)) {
        type = 'all';
      } else {
        type = type + 's';
      }
      queryUrl += type;
      if (category) queryUrl += '/in/' + category.replace(/\s/g,'-');
      if (tagArray.length) queryUrl += '/tagged/' + tagArray.join('+').replace(/\s/g,'-');
      if (queryString) {
        queryString = queryString.replace(/\s/g,'+').trim();
        queryUrl += '/q=' + queryString;
      }
      return queryUrl;
    },

    removeTag: function(tag) {
      var index,
          tags = this.model.defaultData.tags.length ? this.model.defaultData.tags.split('+') : [],
          productTags = this.model.defaultData.product_tags.length ? this.model.defaultData.product_tags.split('+') : [];

      if (tag && tags.length) {
        index = _.indexOf(tags, tag);
        if (index > -1) tags.splice(index,1);
        this.model.defaultData.tags = tags.join('+');
      }

      if (productTags && productTags.length) {
        index = _.indexOf(productTags, tag);
        if (index > -1) productTags.splice(index,1);
        this.model.defaultData.product_tags = productTags.join('+');
      }
    },

    removeCategory: function(category) {
      if (category === this.model.defaultData.category) {
        this.model.defaultData.category = null;
      }
    }

  });

});
