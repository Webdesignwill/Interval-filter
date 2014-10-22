
define([
  'App',
  'IntervalsCollection',
  'text!display/admin/intervals/templates/intervalManagement.tpl'
], function (App, IntervalsCollection, template) {

  "use strict";

  var IntervalManagement = Backbone.View.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new App.Forms();
      this.render();
    },

    render : function () {
      this.$el.html(template);
      this.form.init(IntervalsCollection, {
        name : 'IntervalManagement',
        action : 'addInterval',
        el : this.$el.find('form')
      }, this.done);
      return this;
    },

    done : function () {
      App.$broker.trigger('modal:close');
    },

    close : function () {
      this.form.destroy();
    }

  });

  return IntervalManagement;

});