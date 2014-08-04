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
      _.bindAll(this,'centerModal','cleanupView');

      // Application wide event to close the alert
      vent.on('app:modal:close', this.closeModal, this);

      // Interface with the Alert component for spacing concerns
      // vent.on('app:alert:show', this.shiftModal, this);
      // vent.on('app:alert:closed', this.unshiftModal, this);
    },

    onShow: function(){
      if (!this.ensureView()) return;
      var options = this.getDefaultOptions(_.result(this.currentView, 'dialog'));

      // trick to get modal height before it's shown
      // this.currentView.$el.addClass('active');
      // this.currentView.$el.on('show.bs.modal', this.centerModal);
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
      if (this.ensureView()) this.currentView.$el.modal('hide');
    },

    cleanupView: function(){
      // Modal data is attached to the view.$el - which is removed and detroyed on close
      this.close();
    },

    shiftModal: function(){
      // Bump the modal down 60px to allow for the alery to fit on screen
      // but only if the screen height is too small
      if (this.ensureView() && this.modalOffset() < 60) this.currentView.$el.addClass('shift');
    },

    unshiftModal: function(){
      if (this.ensureView()) this.currentView.$el.removeClass('shift');
    },

    ensureView: function() {
      return (this.currentView) ? true : false;
    },

    centerModal: function(){
      var modalOffset = this.modalOffset(),
          modalDialog = this.modalDialog();
      if (!modalDialog) return;
      if (modalOffset) {
        //center it if it does fit
        modalDialog.css('margin-top', modalOffset);
      } else {
        //set to overflow if no fit
        modalDialog.css('overflow', 'auto');
      }
    },

    modalDialog: function(){
      return this.ensureView() && this.currentView.$el.find('.modal-dialog');
    },

    modalOffset: function(){
      var modalDialog = this.modalDialog();
      if (!modalDialog) return;

      // Calculate the modal height and browser height
      var initModalHeight = modalDialog.outerHeight(),
          userScreenHeight = $(window).height();

      if (initModalHeight > userScreenHeight) {
        return 0;
      } else {
        return ((userScreenHeight / 2) - (initModalHeight/2));
      }
    }

  });

  return Marionette;

});