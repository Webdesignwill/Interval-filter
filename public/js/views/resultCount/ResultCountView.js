
define([
  'ScalesCollection',
  'SelectionCollection',
  'text!views/resultCount/templates/resultCount.tpl'
], function (ScalesCollection, SelectionCollection, template) {

  "use strict";

  var ResultCount = Backbone.View.extend({

    initialize : function () {
      this.listenTo(SelectionCollection, 'updated', function (model, options) {
        this.updateCount();
      }, this);
      this.render();
    },

    setElements : function () {
      this.$resultCount = this.$el.find('.result-count');
      this.$totalCount = this.$el.find('.total-count');
    },

    updateCount : function () {
      var count = _.countBy(ScalesCollection.models, function (model) {
        return model.get('match');
      });
      this.$resultCount.html(count.true || 0);
    },

    render : function () {
      this.$el.html(template);
      this.setElements();

      this.$totalCount.html(ScalesCollection.length);
      this.updateCount();
      return this;
    }
  });

  return ResultCount;

});