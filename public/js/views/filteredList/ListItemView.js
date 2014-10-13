
define([
  'ScalesCollection',
  'handlebars',
  'text!views/filteredList/templates/listItem.tpl'
], function (ScalesCollection, handlebars, template) {

  "use strict";

  var ListItemView = Backbone.View.extend({

    tagName : 'a',
    className : 'list-group-item',
    selectedClass : 'list-group-item-info',
    events : {
      'click' : 'handler'
    },

    initialize : function () {
      this.listenTo(ScalesCollection, 'change:selected', function (model) {
        this.handleSelection(model);
      }, this);
    },

    handleSelection : function (model) {
      if(model.get('_id') === this.model.get('_id')) {
        this.$el[this.model.get('selected') ? 'addClass' : 'removeClass'](this.selectedClass);
      } else {
        this.model.set({selected : false}, {silent : true});
        this.$el.removeClass(this.selectedClass);
      }
    },

    handler : function (e) {
      this.model.set({
        selected : this.model.get('selected') ? false : true
      });
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(this.model.attributes);

      this.$el.html(compiled);
      return this;
    }
  });

  return ListItemView;

});