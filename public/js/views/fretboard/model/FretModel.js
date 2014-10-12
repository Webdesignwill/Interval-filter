
define([], function () {

  "use strict";

  var Fret = Backbone.Model.extend({

    defaults : {
      selected : false
    }
  });

  return Fret;

});