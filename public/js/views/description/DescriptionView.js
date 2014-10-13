
define([
  'App',
  'ScalesCollection',
  'handlebars',
  'text!views/description/templates/description.tpl'
], function (App, ScalesCollection, handlebars, template) {

  "use strict";

  var Description = Backbone.View.extend({
    initialize : function () {
      var self = this;
      this.listenTo(ScalesCollection, 'change:selected', function (model) {
        this.render(model);
      }, this);
    },

    render : function (model) {

      if(!model.get('selected')) return this.$el.empty();

      var tpl = handlebars.compile(template);
      var compiled = tpl(model.attributes);

      this.$el.html(compiled);
      return this;
    }
  });

  return Description;

});