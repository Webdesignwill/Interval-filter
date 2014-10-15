
define([
  'App',
  'require',
  'text!views/modal/templates/modal.tpl'
], function (App, require, template) {

  "use strict";

  var Modal = Backbone.View.extend({

    interests : {
      'modal:open' : function open (event, options) {
        event.data.load(options);
      },
      'modal:close' : function close (event, options) {
        event.data.close();
      }
    },

    initialize : function () {
      App.$broker.on(this.interests, this);
      this.render();
      this.setElements();
    },

    setElements : function () {
      this.$modalContent = this.$el.find('.modal-content');
    },

    load : function (view) {
      var self = this;
      require([view + 'View'], function (View) {
        var view = new View();
        self.$modalContent.html(view.render().el);
      });
    },

    render : function () {
      this.$el.html(template);
      // this.$el.modal(options);
      return this;
    }
  });

  return Modal;

});