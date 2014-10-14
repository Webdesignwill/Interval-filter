
define([
  'App',
  'ScalesCollection'
], function (App, ScalesCollection) {

  "use strict";

  var Button = Backbone.View.extend({

    tagName : 'button',
    className : 'btn btn-sm',
    events : {
      'click' : 'handler'
    },

    initialize : function (options) {
      this.options = options;
      this.render();
    },

    render : function () {
      this.$el.addClass(this.options.class || 'btn-primary');
      this.$el.html(this.options.name);
      return this;
    },

    handler : function (e) {
      e.preventDefault();
      App.$broker.trigger(this.options.event);
    }

  });

  return Button;

});