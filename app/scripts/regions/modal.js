define([
  'vent',
  'jquery',
  'marionette',
  'underscore',
  'bootstrap.modal',
  'bootstrap.transition'
],

function(vent, $, Marionette, _) {

  Marionette.Region.Modal = Marionette.Region.extend({

    initialize: function() {
      _.bindAll(this,'cleanupView');

      // Application wide event to close the alert
      this.listenTo(vent, 'app:modal:close', this.closeModal);
    },

    onShow: function(){
      if (!this.currentView || !this.currentView.$el) return;
      var options = this.getDefaultOptions(_.result(this.currentView, 'dialog'));

      // trick to get modal height before it's shown
      // this.currentView.$el.addClass('active');
      this.currentView.$el.on('hidden.bs.modal', this.cleanupView);

      this.currentView.$el.modal(options);
      $('#main').addClass('shift');
    },

    getDefaultOptions: function(options) {
      options = options || {};
      return _.defaults(options, {
        show: true,
        keyboard: true
      });
    },

    closeModal: function(){
      $('#main').removeClass('shift');
      if (this.currentView && this.currentView.$el.modal) this.currentView.$el.modal('hide');
    },

    cleanupView: function(){
      // Modal data is attached to the view.$el - which is removed and detroyed on close
      this.close();
    }

  });

  return Marionette;

});