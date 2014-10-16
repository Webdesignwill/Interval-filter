
define([
  'App',
  'NavBarView',
  'FretboardView',
  'MatchCountView',
  'ControlsView',
  'ListParentView',
  'DescriptionView',
  'ModalView',
  'text!views/body/templates/body.tpl'
], function (App, NavBarView, FretboardView, MatchCountView, ControlsView, ListParentView, DescriptionView, ModalView, template) {

  "use strict";

  var Body = Backbone.View.extend({

    el : 'body',

    initialize : function () {
      this.render();
      this.setElements();
      this.renderPageComponents();
      this.delegateAnchorClickEvent();
    },

    setElements : function () {
      this.$navBar = this.$el.find('#navbar');
      this.$fretBoard = this.$el.find('#fret-board');
      this.$controls = this.$el.find('#controls');
      this.$matchCountContainer = this.$el.find('#match-count-container');
      this.$filteredList = this.$el.find('#filtered-list');
      this.$selectionDescription = this.$el.find('#selection-description');
      this.$modal = this.$el.find('#modal');
    },

    renderPageComponents : function () {

      new ModalView({
        el : this.$modal
      });

      new NavBarView({
        el : this.$navBar
      });

      new FretboardView({
        el : this.$fretBoard
      });

      new ControlsView({
        el : this.$controls
      });

      new MatchCountView({
        el : this.$matchCountContainer
      });

      new ListParentView({
        el : this.$filteredList
      });

      new DescriptionView({
        el : this.$selectionDescription
      });

    },

    delegateAnchorClickEvent : function () {
      var self = this;
      if (Backbone.history) { // Could also work with pushstates (&& Backbone.history._hasPushState)
        $(document).delegate("a:not(.anchor)", "click", function (evt) {
          var href = $(this).attr("href");
          var protocol = this.protocol + "//";
          if (href && href.slice(0, protocol.length) !== protocol) {
            evt.preventDefault();
            self.hrefController(href);
          }
        });
      }
    },

    hrefController : function (href) {
      var argsArray = href.split(':'),
            module = argsArray[0],
            event = argsArray[1],
            argument = argsArray[2] || null;

      if(module && event) {
        App.$broker.trigger(module + ':' + event, argument);
      }
    },

    render : function () {
      this.$el.html(template);
      return this;
    }
  });

  return new Body();

});