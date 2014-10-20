
define([
  'App'
], function (App) {

  "use strict";

  var AddInterval = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    render : function () {

      App.Forms.make({
        name : 'AddInterval',
        el : this.$el
      }, this.addInterval);

      return this;
    },

    addInterval : function (model) {
      App.User.register({
        email : model.get('email'),
        displayname : model.get('displayname'),
        password : model.get('password')
      }, function (result, data, status) {
        if(result) {return App.$broker.trigger('modal:close'); }
      });
    }

  });

  return AddInterval;

});