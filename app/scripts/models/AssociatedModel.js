define([
  'q',
  'config',
  'underscore',
  'backbone-associations'
], function(q, config, _, Backbone) {

  // Optional Performance Toggles
  Backbone.Associations.EVENTS_BUBBLE = true;
  Backbone.Associations.EVENTS_WILDCARD = true;
  Backbone.Associations.EVENTS_NC = false;

  return Backbone.AssociatedModel.extend({

    setDeferred: function() {
      // Create a deferred and assign it to this.ready for view control flow
      // promise is resolved when the model is fetched, success or error
      this.deferred = q.defer();
      this.ready = this.deferred.promise;
    },

    // We override fetch to manually resolve our deferred
    fetch: function(options) {
      var _this = this;
      options = options ? _.clone(options) : {};

      var error = options.error;
      options.error = function(resp) {
        if (_this.deferred) _this.deferred.resolve(resp);
        if (error) error(_this, resp, options);
      };

      var success = options.success;
      options.success = function(resp) {
        if (_this.deferred) _this.deferred.resolve(resp);
        if (success) success(_this, resp, options);
      };

      return Backbone.Model.prototype.fetch.call(this, options);
    },

    save: function(key, val, options) {
      var attrs, attributes = this.attributes, dataStr = '';

      // Need to use the same conditional that Backbone is using
      // in its default save so that attributes and options
      // are properly passed on to the prototype
      if (!key && !val) {
        attrs = attributes;
        options = {};
      } else if (!key || typeof key === 'object') {
        attrs = key;
        options = val || {};
      } else if (key && val) {
        (attrs = {})[key] = val;
        options = options || {};
      }

      // Since backbone will post all the fields at once, we
      // need a way to post only the fields we want. So we can do this
      // by passing in a JSON in the 'key' position of the args. This will
      // be assigned to options.data. Backbone.sync will evaluate options.data
      // and if it exists will use it instead of the entire JSON.
      if (attrs) {
        options.data = '';
        attrs = _.pick(attrs, this.whitelist);

        _.each(attrs,function(val,key,index){
          if (val !== null && val !== '') dataStr += key+'='+val+'&';
        });
        dataStr = dataStr.slice(0,-1);
        options.data = dataStr;
      }

      // If attrs is null, then we're simply pulling the data object
      // from options and filtering against the whitelist
      if (attrs === null) {
        options.data = _.pick(options.data, this.whitelist);
        _.each(options.data,function(val,key,index){
          if (val !== null && val !== '') {
            dataStr += key+'='+val+'&';
          }
        });
        dataStr = dataStr.slice(0,-1);
        options.data = dataStr;
      }

      // Finally, make a call to the default save now that we've
      // got all the details worked out.
      return Backbone.Model.prototype.save.call(this, attrs, options);
    }

  });

});

