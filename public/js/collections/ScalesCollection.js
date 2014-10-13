
define([
  'ScaleModel'
], function (ScaleModel) {

  "use strict";

  var ScalesCollection = Backbone.Collection.extend({
    url : '/api/scale/all',
    model : ScaleModel,
    initialize : function () {}
  });

  return new ScalesCollection();

});