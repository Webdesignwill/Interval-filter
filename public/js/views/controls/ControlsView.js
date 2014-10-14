
define([
  'ButtonView'
], function (ButtonView) {

  "use strict";

  var Controls = Backbone.View.extend({

    buttons : [{
      name : 'Clear Selection',
      class : 'btn-warning',
      event : 'clear:selection'
    }],

    initialize : function () {
      this.render();
    },

    render : function () {
      var df = document.createDocumentFragment();
      for(var i = 0;i<this.buttons.length;i++) {
        var btn = new ButtonView({
          name : this.buttons[i].name,
          class : this.buttons[i].class,
          event : this.buttons[i].event
        });
        df.appendChild(btn.render().el);
      }
      this.$el.html(df);
      return this;
    }

  });

  return Controls;

});