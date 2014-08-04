module('trackViewRenderingPerformance');
test( "ItemView", function() {

    MarionetteAnalytics.Marionette = Marionette;
    MarionetteAnalytics.trackViewRenderingPerformance( 'CATEGORY1' );

    var tpl = '<div></div>';
    var ItemView = Backbone.Marionette.ItemView.extend({
      moduleName: 'tests/one',
      template: function() {
        return _.template(tpl, {});
      }
    });


    var v = new ItemView();
    v.on('item:rendered', function(){
        ok(this._gaStartTime > 0, '_gaStartTime is defined');
        ok(this._gaFinishTime > 0, '_gaFinishTime is defined');
        ok(this._gaFinishTime > this._gaStartTime, '_gaFinishTime > _gaStartTime');

    });

    $('#qunit-fixture').html(v.render());


});