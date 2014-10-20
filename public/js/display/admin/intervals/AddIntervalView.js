
define([
  'App',
  'IntervalsCollection',
  'text!display/admin/intervals/templates/addInterval.tpl'
], function (App, IntervalsCollection, template) {

  "use strict";

  var AddInterval = Backbone.View.extend({

    initialize : function () {
      this.render();
    },

    render : function () {

      this.$el.html(template);

      App.Forms.make({
        name : 'AddInterval',
        el : this.$el.find('#add-interval-form')
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

  return AddInterval;

});