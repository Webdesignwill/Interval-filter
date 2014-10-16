
define([
  'App'
], function (App) {

  "use strict";

  var Profile = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    render : function () {

      App.Forms.make({
        name : 'Profile',
        el : this.$el
      }, this.put);

      return this;
    },

    put : function (model) {
      App.User.put({
        displayname : model.get('displayname'),
        company : model.get('company'),
        firstname : model.get('firstname'),
        lastname : model.get('lastname')
      }, function (result, data, status) {
        if(result) {return App.$broker.trigger('modal:close'); }
      });
    },

    close : function () {
      this.$el.off();
      this.$el.empty();
    }

  });

  return Profile;

});