
define([
  'App'
], function (App) {

  "use strict";

  var Login = Backbone.View.extend({

    initialize : function (options) {
      this.options = options;
      this.render();
    },

    render : function () {

      App.Forms.make({
        name : 'Login',
        el : this.$el
      }, this.login);

      return this;
    },

    login : function (model) {
      var self = this;
      App.User.login({
        email : model.get('email'),
        password : model.get('password')
      }, function (result, data, status) {
        if(result) {return App.$broker.trigger('modal:close'); }
      });
    },

    close : function () {
      this.$el.off();
      this.$el.empty();
    }

  });

  return Login;

});