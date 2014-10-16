
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
      this.loadUserModel();
    },

    loadScales : function (done) {
      ScalesCollection.fetch({success : done});
    },

    loadBody : function () {
      require(['BodyView'], function (BodyView) {});
    },

    loadUserModel : function () {
      var self = this;
      require(['UserModel'], function (UserModel) {
        self.User = new UserModel();
        self.loadForms();
      });
    },

    loadForms : function () {
      var self = this;
      base_require(['forms'], function (config) {
        function load () {
          req(['Forms'], function (Forms) {
            self.Forms = Forms;
            Forms.set({
              User : self.User,
              $broker : self.$broker
            });
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