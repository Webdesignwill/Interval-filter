
define([
  'ListItemView',
  'SelectionCollection',
  'ScalesCollection'
], function (ListItemView, SelectionCollection, ScalesCollection) {

  "use strict";

  var ListParentView = Backbone.View.extend({

    initialize : function () {
      this.listenTo(SelectionCollection, 'updated', function (model, options) {
        this.render();
      });
      this.render();
    },

    render : function () {

      if(ScalesCollection.getMatchCount() === 0) {
        return this.$el.html('<p class="text-warning">There are no matches to display</p>');
      }

      var df = document.createDocumentFragment();
      ScalesCollection.each(function (model, index, collection) {
        if(model.get('match')) {
          var liv = new ListItemView({
            model : model
          });
          df.appendChild(liv.render().el);
        }
      });
      this.$el.html(df);
      return this;
    }
  });

  return ListParentView;

});