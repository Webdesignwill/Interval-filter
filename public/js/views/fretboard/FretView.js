
define([
  'App',
  'SelectionCollection',
  'handlebars',
  'FretModel',
  'text!views/fretboard/templates/fret.tpl'
], function (App, SelectionCollection, handlebars, FretModel, template) {

  "use strict";

  var Fret = Backbone.View.extend({

    tagName : 'li',
    className : 'col-md-1 col-xs-1',
    events : {
      'click' : 'click'
    },

    initialize : function (options) {
      this.model = new FretModel({number : options.number + 1});
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
      var compiled = tpl({count : this.model.get('number')});

      this.$el.html(compiled);
      return this;
    },

    click : function (e) {
      this.model.set('selected', this.model.get('selected') ? false : true);
    },

    updateAttrs : function () {
      var cla = this.model.get('selected') ? 'addClass' : 'removeClass';
      this.$el[cla]('selected');

      var action = this.model.get('selected') ? 'add' : 'remove';
      SelectionCollection[action](this.model);

      SelectionCollection.trigger('updated', this);
    }
  });

  return Fret;

});