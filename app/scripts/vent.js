define([
  'backbone.wreqr',
  'underscore'
],
/**
 * A module that exports `SuperVent` - simply an event aggregator that has all
 * the different `Wreqr` functionality built in.
 * @module supervent
 * @requires module:backbone.wreqr
 * @exports SuperVent
 */
function(Wreqr, _) {

  var SuperVent = {};

  /**
   * An event aggregator with Wreqr.Commands and Wreqr.RequestResponse objects added.
   * @class SuperVent
   * @alias module:supervent
   * @classdesc A `Marionette.EventAggregator` object with `Wreqr.Commands`
   * and `Wreqr.RequestResponse` instances built in.
   * @property {Backbone.Wreqr.Commands} commands - A Wreqr.Commands instance
   * @property {Backbone.Wreqr.RequestResponse} reqres - A Wreqr.RequestResponse instance
   */
  SuperVent = Wreqr.EventAggregator.extend({

    /**
     * @constructs SuperVent
     */
    constructor: function(debug){

      this.debug = debug || false;

      this.commands = new Wreqr.Commands();
      this.reqres = new Wreqr.RequestResponse();

      Wreqr.EventAggregator.prototype.constructor.apply(this, arguments);

      if (this.debug) {
        this.on('all', this.logToConsole, this);
      }
    },

    logToConsole: function() {
      var args = Array.prototype.slice.call(arguments);
      var eventName = args[0];
      console.log('vent triggered :%s with args %o', eventName, args.slice(1));
    }

  });

  _.extend(SuperVent.prototype, {
    // Command execution, facilitated by Backbone.Wreqr.Commands
    execute: function(){
      var args = Array.prototype.slice.apply(arguments);
      this.commands.execute.apply(this.commands, args);
    },

    // Request/response, facilitated by Backbone.Wreqr.RequestResponse
    request: function(){
      var args = Array.prototype.slice.apply(arguments);
      return this.reqres.request.apply(this.reqres, args);
    }
  });

  return new SuperVent();

});