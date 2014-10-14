
define([
  'ScalesCollection',
  'SelectionCollection',
  'text!views/matchCount/templates/matchCount.tpl'
], function (ScalesCollection, SelectionCollection, template) {

  "use strict";

  var MatchCount = Backbone.View.extend({

    initialize : function () {
      this.listenTo(SelectionCollection, 'updated', function (model, options) {
        this.updateCount();
      }, this);
      this.render();
    },

    setElements : function () {
      this.$matchCount = this.$el.find('.match-count');
      this.$totalCount = this.$el.find('.total-count');
    },

    updateCount : function () {
      this.$matchCount.html(ScalesCollection.getMatchCount());
    },

    render : function () {
      this.$el.html(template);
      this.setElements();

      this.$totalCount.html(ScalesCollection.length);
      this.updateCount();
      return this;
    }
  });

  return MatchCount;

});