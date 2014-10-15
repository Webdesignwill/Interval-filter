
define([
  'App',
  'text!views/navbar/templates/navbar.tpl'
], function (App, template) {

  "use strict";

  var NavBar = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    render : function () {
      this.$el.html(template);
      return this;
    }
  });

  return NavBar;

});