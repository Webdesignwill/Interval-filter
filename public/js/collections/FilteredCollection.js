
define([
  'App',
  'ScaleModel',
  'SelectionCollection',
  'ScalesCollection'
], function (App, ScaleModel, SelectionCollection, ScalesCollection) {

  "use strict";

  var FilteredCollection = Backbone.Collection.extend({
    model : ScaleModel,
    initialize : function () {
      this.listenTo(SelectionCollection, 'all', function (event, model, selectionCollection) {
        if(event === 'add' || event === 'remove') this.filter();
      });
    },

    /*
      Now we need to filter the ScalesCollection and add to this collection whatever we find in there that matches
    */

    filter : function () {
      /* add to this collection the scale that has the numbers from selectionCollection */
      // var results = _.filter(ScalesCollection.models, function (obj, index, models) {
        //ARRAY : SelectionCollection.models
      //   debugger;
      // }, this);
    }

  });

  return new FilteredCollection();

});