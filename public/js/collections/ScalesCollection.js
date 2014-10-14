
define([
  'ScaleModel'
], function (ScaleModel) {

  "use strict";

  var ScalesCollection = Backbone.Collection.extend({
    url : '/api/scale/all',
    model : ScaleModel,

    parse : function (response) {
      function parseNotes (notes) {
        var n = [];
        notes = notes.split(',');
        for(var j = 0; j<notes.length; j++) {
          n.push(parseFloat(notes[j]));
        }
        return n;
      }

      for(var i = 0; i<response.length;i++) {
        response[i].notes = parseNotes(response[i].notes);
      }

      return response;
    }
  });

  return new ScalesCollection();

});