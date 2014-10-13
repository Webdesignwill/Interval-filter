
define([
  'App',
  'ScalesCollection'
], function (App, ScalesCollection) {

  "use strict";

  var Button = Backbone.View.extend({

    tagName : 'button',
    className : 'btn btn-primary btn-sm',
    events : {
      'click' : 'handler'
    },

    initialize : function (options) {
      this.options = options;
      this.render();
    },

    render : function () {
      this.$el.addClass(this.options.class);
      this.$el.html(this.options.name);
      return this;
    },

    handler : function (e) {
      e.preventDefault();
      /* Have this trigger a clear event to the Scales Collection. THis will go through the models
      and set each one to false */
      App.$broker.trigger(this.options.event);
    }

  });

  return Button;

});