
define([
  'ButtonView',
  'text!views/controls/templates/controls.tpl'
], function (ButtonView, template) {

  "use strict";

  var Controls = Backbone.View.extend({

    buttons : [{
      name : 'Clear Highlighting',
      class : 'clear-highlighting',
      event : 'highlighting:clear'
    },{
      name : 'Clear Selection',
      class : 'clear-selection',
      event : 'clear:selection'
    }],

    initialize : function () {
      this.render();
    },

    render : function () {
      this.$el.html(template);
      var self = this;

      var df = document.createDocumentFragment();
      for(var i = 0;i<this.buttons.length;i++) {
        var btn = new ButtonView({
          name : this.buttons[i].name,
          class : this.buttons[i].class,
          event : this.buttons[i].event
        });
        df.appendChild(btn.render().el);
      }
      this.$el.find('.panel-body').html(df);
      return this;
    }

  });

  return Controls;

});