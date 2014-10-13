
define([
  'Backbone',
  'SelectionCollection'
], function (Backbone, SelectionCollection) {

  "use strict";

  var ScaleModel = Backbone.Model.extend({
    initialize : function () {
      this.listenTo(SelectionCollection, 'all', function (event, model, selectionCollection) {
        if(event === 'add' || event === 'remove') this.filter();
      });
    },

    filter : function () {
      var selection = [], match;
      for(var i = 0;i<SelectionCollection.models.length;i++) {
        var model = SelectionCollection.models[i];
        selection.push(model.get('number'));
      }

      if(!selection.length) {
        this.set('match', false);
      } else {
        var ar = _.difference(selection, this.get('notes'));
        this.set({
          match : !ar.length ? true : false
        });
      }
    }
  });

  return ScaleModel;

});