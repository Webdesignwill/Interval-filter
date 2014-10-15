
define([
  'App',
  'text!views/modal/templates/modal.tpl'
], function (App, template) {

  "use strict";

  var Login = Backbone.View.extend({

    initialize : function () {
      console.log(App.Forms);
    },

    render : function () {
      return this;
    }
  });

  return Login;

});