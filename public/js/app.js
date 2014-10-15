
define([
  'Backbone',
  'require',
  'ScalesCollection'
], function (Backbone, require, ScalesCollection) {

  "use strict";

  var App = Backbone.Model.extend({

    $broker : $({}),
    defaults : {
      octave : 12
    },

    init : function () {
      this.loadScales(this.loadBody);
      this.loadForms();
    },

    loadScales : function (done) {
      ScalesCollection.fetch({success : done});
    },

    loadBody : function () {
      require(['BodyView'], function (BodyView) {});
    },

    loadForms : function () {
      var self = this;
      base_require(['forms'], function (config) {
        function load () {
          req(['Forms'], function (Forms) {
            self.Forms = Forms;
          });
        }
        var req = window.require(config(), function () {
          load();
        });
      });
    }

  });

  return new App();

});