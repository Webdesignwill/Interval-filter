
define([
  'IntervalsCollection',
  'SelectionCollection',
  'text!display/public/matchCount/templates/matchCount.tpl'
], function (IntervalsCollection, SelectionCollection, template) {

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
      this.$matchCount.html(IntervalsCollection.getMatchCount());
    },

    render : function () {
      this.$el.html(template);
      this.setElements();

      this.$totalCount.html(IntervalsCollection.length);
      this.updateCount();
      return this;
    }
  });

  return MatchCount;

});