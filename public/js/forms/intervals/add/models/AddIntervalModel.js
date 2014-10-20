
define([],

function () {

  "use strict";

  var AddIntervalModel = Backbone.Model.extend({

    validation : {
      intervalname : [{
        required : true,
        msg : 'Please enter the interval name'
      }],
      intervalnumbers : [{
        required : true,
        msg : 'What numbers are in the interval'
      }],
      intervaldescription : [{
        required : false,
        msg : 'Please enter an interval description'
      }]
    }
  });
  return AddIntervalModel;
});
