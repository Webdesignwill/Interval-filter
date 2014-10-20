
define([
  'App'
], function (App) {

  "use strict";

  var Register = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    render : function () {

      App.Forms.make({
        name : 'Register',
        el : this.$el
      }, this.register);

      return this;
    },

    register : function (model) {
      App.User.register({
        email : model.get('email'),
        displayname : model.get('displayname'),
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

  return Register;

});