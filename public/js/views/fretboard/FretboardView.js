
define([
  'App',
  'FretView'
], function (App, FretView) {

  "use strict";

  var Fretboard = Backbone.View.extend({
    initialize : function () {
      this.render();
    },
    render : function () {

      var dc = document.createDocumentFragment();
      for(var i = 0; i<App.get('octave');i++) {
        var fv = new FretView({number : i});
        dc.appendChild(fv.render().el);
      }
      this.$el.html(dc);

      return this;
    }
  });

  return Fretboard;

});