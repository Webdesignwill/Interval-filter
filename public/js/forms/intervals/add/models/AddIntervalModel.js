
define([],

function () {

  "use strict";

  var AddIntervalModel = Backbone.Model.extend({

    validation : {
      name : [{
        required : true,
        msg : 'Please enter the interval name'
      }],
      notes : [{
        required : true,
        msg : 'What notes are in the interval'
      }],
      description : [{
        required : false,
        msg : 'Please enter an interval description'
      }]
    }
  });
  return AddIntervalModel;
});
