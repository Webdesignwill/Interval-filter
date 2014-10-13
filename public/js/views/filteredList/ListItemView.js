
define([
  'handlebars',
  'text!views/filteredList/templates/listItem.tpl'
], function (handlebars, template) {

  "use strict";

  var ListItemView = Backbone.View.extend({

    tagName : 'a',

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(this.model.attributes);

      this.$el.html(compiled);
      return this;
    }
  });

  return ListItemView;

});