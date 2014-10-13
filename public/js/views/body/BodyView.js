
define([
  'FretboardView',
  'ControlsView',
  'ListParentView',
  'text!views/body/templates/body.tpl'
], function (FretboardView, ControlsView, ListParentView, template) {

  "use strict";

  var Body = Backbone.View.extend({

    el : 'body',

    initialize : function () {
      this.render();
      this.setElements();
      this.renderPageComponents();
    },

    setElements : function () {
      this.$fretBoard = this.$el.find('#fret-board');
      this.$controls = this.$el.find('#controls');
      this.$filteredList = this.$el.find('#filteredList');
    },

    renderPageComponents : function () {

      new FretboardView({
        el : this.$fretBoard
      });

      new ControlsView({
        el : this.$controls
      });

      new ListParentView({
        el : this.$filteredList
      });

    },

    render : function () {
      this.$el.html(template);
      return this;
    }
  });

  return new Body();

});