
define([
  'require'
], function (require) {

  "use strict";

  var Forms = Backbone.Model.extend({

    make : function (options, callback) {
      require([options.name + 'Form'], function (Form) {
        var form = new Form({
          el : options.el,
          callback : callback,
          displayAttrs : options.displayAttrs
        });
      });
    }

  });

  return new Forms();

});