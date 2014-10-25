
define([],

function () {

  "use strict";

  var IntervalManagementModel = Backbone.Model.extend({

    urls : { name : '/api/interval/unique' },

    validation : {
      name : [{
        required : true,
        msg : 'Please enter the interval name'
      },{
        unique : true,
        msg : 'This interval name is already listed'
      }],
      notes : [{
        required : true,
        msg : 'What notes are in the interval?'
      }],
      description : [{
        required : false,
        msg : 'Please enter an interval description'
      }]
    }
  });
  return IntervalManagementModel;
});
