
define([
  'App',
  'ScalesCollection',
  'handlebars',
  'text!display/public/description/templates/description.tpl'
], function (App, ScalesCollection, handlebars, template) {

  "use strict";

  var Description = Backbone.View.extend({

    initialize : function () {
      var self = this;
      this.listenTo(ScalesCollection, 'change:selected', function (model) {
        this.render(model);
      }, this);

      App.$broker.on('clear:selection', function () {
        self.close();
      });
    },

    render : function (model) {

      if(!model.get('selected')) return this.close();

      var tpl = handlebars.compile(template);
      var compiled = tpl(model.attributes);

      this.$el.html(compiled);
      return this;
    },

    close : function () {
      this.$el.empty();
    }

  });

  return Description;

});