
define([
  'text!views/filteredList/templates/listItem.tpl'
], function (template) {

  "use strict";

  var ListItemView = Backbone.View.extend({
    initialize : function (options) {
      this.options = options;
    }
  });

  return ListItemView;

});