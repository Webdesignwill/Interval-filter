
define([
  'App',
  'IntervalsCollection',
  'text!display/admin/intervals/templates/intervalManagement.tpl'
], function (App, IntervalsCollection, template) {

  "use strict";

  var IntervalManagement = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    render : function () {

      this.$el.html(template);

      App.Forms.make({
        name : 'IntervalManagement',
        el : this.$el.find('#interval-management-form')
      }, this.addInterval);

      return this;
    },

    addInterval : function (model) {
      IntervalsCollection.addInterval({
        name : model.get('name'),
        notes : model.get('notes'),
        description : model.get('description')
      }, function (result, data, status) {
        if(result) {return; }
      });
    }

  });

  return IntervalManagement;

});