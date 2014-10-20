
define([
  'App',
  'IntervalsCollection',
  'handlebars',
  'text!display/public/filteredList/templates/listItem.tpl'
], function (App, IntervalsCollection, handlebars, template) {

  "use strict";

  var ListItemView = Backbone.View.extend({

    tagName : 'a',
    className : 'list-group-item',
    selectedClass : 'list-group-item-info',
    events : {
      'click' : 'handler'
    },

    initialize : function () {
      var self = this;
      this.listenTo(IntervalsCollection, 'change:selected', function (model) {
        if(model.get('_id') !== this.model.get('_id')) return this.clearSelection();
      }, this);

      App.$broker.on('clear:selection', function () {
        self.clearSelection();
      });
    },

    clearSelection : function () {
      this.model.set({selected : false}, {silent : true});
      this.toggleClass();
    },

    handler : function (e) {
      this.model.set({
        selected : this.model.get('selected') ? false : true
      });
      this.toggleClass();
    },

    toggleClass : function () {
      this.$el[this.model.get('selected') ? 'addClass' : 'removeClass'](this.selectedClass);
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(this.model.attributes);

      this.$el.html(compiled);
      this.toggleClass();

      return this;
    },

    close : function () {
      this.stopListening();
      this.off();
      this.remove();
    }

  });

  return ListItemView;

});