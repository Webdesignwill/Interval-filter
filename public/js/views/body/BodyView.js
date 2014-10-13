
define([
  'FretboardView',
  'ControlsView',
  'ListParentView',
  'DescriptionView',
  'text!views/body/templates/body.tpl'
], function (FretboardView, ControlsView, ListParentView, DescriptionView, template) {

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
      this.$filteredList = this.$el.find('#filtered-list');
      this.$selectionDescription = this.$el.find('#selection-description');
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

      new DescriptionView({
        el : this.$selectionDescription
      });

    },

    render : function () {
      this.$el.html(template);
      return this;
    }
  });

  return new Body();

});