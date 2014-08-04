define([
  'q',
  'jquery',
  'imagesloaded',
  'underscore',
  'backbone',
  'vent',
  'models/GetPage',
  'models/GetPosts',
  'models/GetPost',
  'collections/Posts',
  'regions/swiper',
  'views/PostsView',
  'views/TabNavView',
  'views/SidebarView',
  'views/AboutView',
  'views/SearchColorsView',
  'hbar!templates/home'

], function(q, $, imagesloaded, _, Backbone, vent, GetPage, GetPosts, GetPost, Posts, Marionette, PostsView, TabNavView, SidebarView, AboutView, SearchColorsView, homeTemplate){

  return Marionette.Layout.extend({

    template: homeTemplate,

    className: 'home',

    regions: {
      posts: {
        regionType: Marionette.Region.Swiper,
        selector: '#post-region'
      },
      prevNav: '#prev-btn-region',
      nextNav: '#next-btn-region',
      about: '#about-region',
      // sidebar: '#sidebar-region',
      colorsRegion: '.search-colors-region'
    },

    // If we hit a direct slug, grab the slug and run a get_post
    // Add that fetched model to our collection and fetch model +/-1
    // After each 'next' / 'prev' - grab the prev/next url slug and fetch
    //
    // If we hit the homepage, query GetPosts for the first two
    // After 'next' fetch one at a time

    initialize: function(options) {
      _.bindAll(this,'loadPosts','loadPost','initialLoad','showColors');
      options = options || {};

      var slug = options.slug;

      this.collection = new Posts();
      this.totalCount = 0;
      this.navModel = new Backbone.Model({ index: 0, first: true, last: false });

      if (slug) {
        // page specific fetch
        this.getPost = this.fetchPost(slug);
        q(this.getPost.ready).then(this.loadPost).done();
      } else {
        // initial fetch
        this.getPosts = this.fetchPosts();
        q(this.getPosts.ready).then(this.initialLoad).done();
      }

      vent.on('load:next', this.loadNext, this);
      vent.on('load:prev', this.loadPrev, this);

      this.colors = this.fetchColors('search');
      q(this.colors.ready).then(this.showColors).done();
    },

    onDomRefresh: function() {
      this.prevNav.show( new TabNavView({ type: 'prev', model: this.navModel }) );
      this.nextNav.show( new TabNavView({ type: 'next', model: this.navModel }) );
      this.about.show( new AboutView() );

      _.delay(function(){ $('#arrows').addClass('active'); },2500);
    },

    fetchColors: function(slug) {
      var page = new GetPage();
      _.extend(page.defaultData, {
        slug: slug
      });
      page.ready = page.fetch();
      return page;
    },

    fetchPost: function(slug) {
      if (!slug) return;
      var post = new GetPost();
      post.ready = post.fetch({
        data: { slug: slug }
      });
      return post;
    },

    fetchPosts: function(page) {
      page = page || 1;
      var posts = new GetPosts();
      posts.ready = posts.fetch({
        data: { page: page }
      });
      return posts;
    },

    addPost: function(post, index) {
      index = index || 0;
      this.collection.add(post, { at: index });
    },

    initialLoad: function() {
      this.loadPosts();
      this.activePost = this.collection.at(0);
      this.showRegions();
    },

    showRegions: function() {
      // this.sidebar.show( new SidebarView({ model: this.activePost }) );
      this.posts.show( new PostsView({ collection: this.collection, model: this.navModel }) );
      this.activePost.select();
      vent.execute('navigate', this.activePost.get('slug'), false);
    },

    showColors: function() {
      this.colorsRegion.show( new SearchColorsView({ collection: this.colors.get('page.colors') }) );
    },

    loadPost: function() {
      this.activePost = this.getPost.get('post');
      this.totalCount += 1;
      this.addPost(this.activePost);
      this.getPosts = this.fetchPosts();
      q(this.getPosts.ready).then(this.loadPosts).done();
      this.showRegions();
    },

    loadPosts: function() {
      vent.trigger('load:start');
      this.collection.set(this.getPosts.get('posts'), { merge: false, remove: false });
      this.totalCount += this.getPosts.get('posts').length;
    },

    // loadSidebar: function(model) {
    //   if (!this.sidebar) return;
    //   var sidebarView = this.sidebar.currentView;
    //   if (sidebarView) sidebarView.updateModel(model);
    // },

    loadNext: function() {
      var newIndex = this.navModel.get('index') - 1,
          isFirst = newIndex ? false : true;
      this.navModel.set({
        index: newIndex,
        first: isFirst,
        last: false
      });
      this.updateUrl(newIndex);
    },

    loadPrev: function() {
      var newIndex = this.navModel.get('index') + 1,
          count_total = this.getPosts.get('count_total'),
          isLast = (count_total === newIndex) ? true : false;
      this.navModel.set({
        index: newIndex,
        first: false,
        last: isLast
      });
      this.updateUrl(newIndex);
      this.fetchMore(newIndex);
    },

    fetchMore: function(newIndex) {
      var count, count_total, currentPage;

      if (newIndex >= this.collection.length - 2) {
        count = this.getPosts.get('count');
        count_total = this.getPosts.get('count_total');
        currentPage = this.totalCount / count;

        if (count_total > this.totalCount) {
          this.getPosts = this.fetchPosts(currentPage + 1);
          q(this.getPosts.ready).then(this.loadPosts).done();
        }
      }
    },

    updateUrl: function (index) {
      this.activePost = this.collection.at(index);
      _.delay(this.activePost.select, 400);
      // this.loadSidebar(this.activePost);

      vent.execute('navigate', this.activePost.get('slug'), false);
    }

  });

});