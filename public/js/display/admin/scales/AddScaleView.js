
define([], function () {

  "use strict";

  var AddScale = Backbone.View.extend({

    initialize : function (options) {},

    render : function () {

      return this;
    },

    close : function () {
      this.$el.off();
      this.$el.empty();
    }

  });

  return AddScale;

});