define([
  'q',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'models/GetPage',
  'models/GetCategories',
  'models/GetTerms',
  'collections/Tags',
  'collections/Categories',
  'views/CategoriesView',
  'views/TagsView',
  'views/SearchColorsView',
  'hbar!templates/search-filters'
], function(q, $, _, Backbone, Marionette, vent, GetPage, GetCategories, GetTerms, Tags, Categories, CategoriesView, TagsView, SearchColorsView, searchFiltersTpl){

/*

Search URL Routes

TODO: Convert routes to PHP for SEO

/search/all/
/search/styleboards/q=:query
/search/posts/q=:query
/search/products/q=:query
/search/:type/in/:category/tagged/:tags/q=:query
eg. /search/styleboards/in/girl-nursery/tagged/vintage+blue/q=vivi+charles

/:post-slug (post and boards)
/products/:slug (modal view)
/products/ (all products search view?)

NOTES:
- Pinterest Mobile - show lising of top categories below search input?

*/

  return Marionette.Layout.extend({

    template: searchFiltersTpl,

    className: 'filters row',

    regions: {
      tagsRegion: '.search-tags-region',
      categoriesRegion: '.search-categories-region',
      colorsRegion: '.search-colors-region'
    },

    events: {
      'mouseenter .post-types': 'showCategories',
      'mouseleave .post-types': 'hideCategories',
      'mouseenter .post-types a.filter-btn': 'filterCategories',

      'click .post-types a.filter-btn': 'selectType',
      'click a.tag-filters': 'toggleTags',
      'click a.color-filters': 'toggleColors'
    },

    bindings: {
      '.filter-btn[data-type="all"]': {
        attributes: [{
          observe: 'type',
          name: 'class',
          onGet: function(val) {
            return (val === 'all') ? 'active' : '';
          }
        }]
      },
      '.filter-btn[data-type="styleboard"]': {
        attributes: [{
          observe: 'type',
          name: 'class',
          onGet: function(val) {
            return (val === 'styleboard') ? 'active' : '';
          }
        }]
      },
      '.filter-btn[data-type="post"]': {
        attributes: [{
          observe: 'type',
          name: 'class',
          onGet: function(val) {
            return (val === 'post') ? 'active' : '';
          }
        }]
      },
      '.filter-btn[data-type="product"]': {
        attributes: [{
          observe: 'type',
          name: 'class',
          onGet: function(val) {
            return (val === 'product') ? 'active' : '';
          }
        }]
      },
      '.category-list': {
        observe: 'categories',
        visible: true
      },
      '.tag-list': {
        observe: 'tags',
        visible: true
      },
      '.search-colors': {
        observe: 'colors',
        visible: true
      },
      '.tag-filters': {
        attributes: [{
          name: 'class',
          observe: 'tags',
          onGet: function(val) {
            return val ? 'active' : '';
          }
        },
        {
          name: 'class',
          observe: 'type',
          onGet: function(val) {
            return (val === 'post' || val === 'all') ? 'disabled' : '';
          }
        }]
      },
      '.color-filters': {
        attributes: [{
          name: 'class',
          observe: 'colors',
          onGet: function(val) {
            return val ? 'active' : '';
          }
        }]
      }
    },

    initialize: function(){
      _.bindAll(this,'loadColors','loadCategories','loadTags');
      this.model = vent.request('search:model');
      this.listenTo(this.model, 'change', this.setTypes, this);
      this.listenTo(vent, 'search:update:type', this.updateType, this);

      this.viewModel = new Backbone.Model({ categories: false, tags: false, colors: false, type: 'all' });

      this.colors = this.fetchColors('search');
      this.postTypes = this.fetchCategories('category','1,4,14,29,35,36,46,49,50');
      this.productTypes = this.fetchCategories('product_type','15,62,63,64,130,147,164,168');
      this.boardTypes = this.fetchTerms('post_tag','20,22,23,25,49','');
      this.categories = new Categories();

      // Exclude Colors
      // this.productTags = this.fetchTerms('product_tag','','74,104,8,80,198,47,44,201,7,31,89,199,206,197,200,151,34,158,30,202,17,28,26,41,203,42,92,48');
      // this.boardTags = this.fetchTerms('post_tag','','10,15,20,22,23,25,27,33,38,39,43,152,180,74,104,8,80,198,47,44,201,7,31,89,199,206,197,200,151,34,158,30,202,17,28,26,41,203,42,92,48');
      // this.tags = new Tags();
    },

    onDomRefresh: function() {
      this.updateBindings();
      q.spread([this.postTypes.ready, this.productTypes.ready, this.boardTypes.ready], this.loadCategories).done();
      // q.spread([this.productTags.ready, this.boardTags.ready], this.loadTags).done();
      q(this.colors.ready).then(this.loadColors).done();
    },

    updateBindings: function() {
      this.stickit(this.viewModel);
    },

    setTypes: function() {
      var type = this.model.defaultData.type;
          // category = this.model.defaultData.category,
          // product_type = this.model.defaultData.product_type,
          // product_tags = this.model.defaultData.product_tags,
          // tags = this.model.defaultData.tags;

      this.viewModel.set({ type: type });
    },

    selectType: function(ev) {
      ev.preventDefault();
      var $el = $(ev.currentTarget),
          type = $el.data('type'),
          url = this.updateType(type);
      vent.execute('navigate','/search/' + url, true);
    },

    updateType: function(type) {
      var category = null;

      vent.execute('search:remove:category','style-boards');
      this.model.defaultData.tags = '';
      this.model.defaultData.product_tags = '';
      this.model.defaultData.category = null;
      this.model.defaultData.product_type = null;
      this.viewModel.set({ type: type });

      if (type === 'all') {
        type = ['post','product'];
        // this.tags.reset(this.combineTags());
        // this.tags.reset();
      } else if (type === 'styleboard') {
        type = 'post';
        category = 'style-boards';
        // this.tags.reset(this.boardTags.get('tags').models);
      } else if (type === 'product') {
        // this.tags.reset(this.productTags.get('tags').models);
      } else {
        // this.tags.reset();
      }
      return vent.request('fetch:url', type, category, null, null);
    },

    fetchColors: function(slug) {
      var page = new GetPage();
      _.extend(page.defaultData, {
        slug: slug
      });
      page.ready = page.fetch();
      return page;
    },

    fetchCategories: function(taxonomy, exclude) {
      exclude = exclude || 0;
      var categories = new GetCategories();
      _.extend(categories.defaultData, {
        exclude: exclude,
        taxonomy: taxonomy
      });
      categories.ready = categories.fetch();
      return categories;
    },

    fetchTerms: function(taxonomy, include, exclude) {
      var terms = new GetTerms();
      _.extend(terms.defaultData, {
        taxonomy: taxonomy,
        include: include,
        exclude: exclude
      });
      terms.ready = terms.fetch();
      return terms;
    },

    combineTags: function() {
      var producttags = this.productTags.get('tags').models,
          boardtags = this.boardTags.get('tags').models;
      return producttags.concat(boardtags);
    },

    combineCategories: function() {
      var productTypes = this.productTypes.get('categories').models,
          postTypes = this.postTypes.get('categories').models,
          boardTypes = this.boardTypes.get('tags').models;
      return postTypes.concat(productTypes,boardTypes);
    },

    loadTags: function() {
      // this.tags.reset(this.combineTags());
      this.tagsRegion.show( new TagsView({ tags: this.tags }) );
      this.updateBindings();
    },

    loadColors: function() {
      this.colorsRegion.show( new SearchColorsView({ collection: this.colors.get('page.colors') }) );
      this.updateBindings();
    },

    loadCategories: function() {
      this.productTypes.get('categories').each(function(cat){
        cat.set({ post_type: 'product' });
      });
      this.postTypes.get('categories').each(function(cat){
        cat.set({ post_type: 'post' });
      });
      this.boardTypes.get('tags').each(function(tag){
        tag.set({ post_type: 'styleboard' });
      });
      // this.categories.reset(this.combineCategories());
      this.categoriesRegion.show( new CategoriesView({ collection: this.categories }) );
      this.updateBindings();
    },

    filterCategories: function(ev) {
      var type = $(ev.currentTarget).data('type');

      if (type === 'all') {
        this.categories.reset();
      } else if (type === 'styleboard') {
        this.categories.reset(this.boardTypes.get('tags').models);
      } else if (type === 'product') {
        this.categories.reset(this.productTypes.get('categories').models);
      } else if (type === 'post') {
        this.categories.reset(this.postTypes.get('categories').models);
      }
    },

    showCategories: function() {
      this.viewModel.set({ categories: true });
    },

    hideCategories: function() {
      this.viewModel.set({ categories: false });
    },

    toggleTags: function(ev) {
      ev.preventDefault();
      var current = this.viewModel.get('tags');
      this.viewModel.set({ tags: !current });
    },

    toggleColors: function(ev) {
      ev.preventDefault();
      var current = this.viewModel.get('colors');
      this.viewModel.set({ colors: !current });
    }

  });

});
