
define([
  'App',
  'handlebars',
  'FretModel',
  'text!views/fretboard/templates/fret.tpl'
], function (App, handlebars, FretModel, template) {

  "use strict";

  var Fret = Backbone.View.extend({

    tagName : 'li',
    className : 'col-md-1 col-xs-1',
    events : {
      'click' : 'click'
    },

    initialize : function (options) {
      this.options = options;
      this.options.number = this.options.number + 1;
      this.model = new FretModel();
      this.setListeners();
    },

    setListeners : function () {
      var self = this;

      App.$broker.on('selection:clear', function (e) {
        self.model.set('selected', false);
      });
      // App.$broker.on('highlighting:clear', function (e) {
      //   self.model.set('highlight', false);
      // });
      this.model.on('change:selected', function () {
        self.updateAttrs();
      });
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl({count : this.options.number});

      this.$el.html(compiled);
      return this;
    },

    click : function (e) {
      this.model.set('selected', this.model.get('selected') ? false : true);
    },

    updateAttrs : function () {
      var cla = this.model.get('selected') ? 'addClass' : 'removeClass';
      this.$el[cla]('selected');

      // var action = this.selected ? 'removed' : 'selected';
      // App.$broker.trigger({
      //   type : 'interval:' + action,
      //   interval : this.options.number,
      //   element : this.$el
      // });

    }
  });

  return Fret;

});