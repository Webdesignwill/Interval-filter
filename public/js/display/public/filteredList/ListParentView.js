
define([
  'handlebars',
  'ListItemView',
  'SelectionCollection',
  'ScalesCollection',
  'text!display/public/filteredList/templates/listParent.tpl'
], function (handlebars, ListItemView, SelectionCollection, ScalesCollection, template) {

  "use strict";

  var ListParentView = Backbone.View.extend({

    initialize : function () {
      this.listenTo(SelectionCollection, 'updated', function (model, options) {
        this.render();
      });
      this.render();
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl({
        count : !ScalesCollection.getMatchCount()
      });

      this.$el.html(compiled);

      var df = document.createDocumentFragment();
      ScalesCollection.each(function (model, index, collection) {
        if(model.get('match')) {
          var liv = new ListItemView({
            model : model
          });
          df.appendChild(liv.render().el);
        }
      });

      this.$el.append(df);

      return this;
    }
  });

  return ListParentView;

});