
define([
  'IntervalModel'
], function (IntervalModel) {

  "use strict";

  var IntervalsCollection = Backbone.Collection.extend({
    url : '/api/interval/all',
    model : IntervalModel,

    getMatchCount : function () {
      var count = _.countBy(this.models, function (model) {
        return model.get('match');
      });
      return count.true || 0;
    },

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

  return new IntervalsCollection();

});