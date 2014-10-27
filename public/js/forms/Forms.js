
define([
  'require'
], function (require) {

  "use strict";

  var Forms = Backbone.Model.extend({

    init : function (model, options, done) {
      this.model = model;
      this.action = options.action;
      this.done = done;

      this.loadForm(options);
    },

    loadForm : function (options) {
      var self = this;
      require(['FormView'], function (FormView) {
        self.formView = new FormView({
          name : options.name,
          el : options.el,
          serverModel : self.model,
          displayModel : self.model.attributes
        }, function validCallback (validatedModel, invalid) {
          self.formValid(validatedModel, invalid);
        });
      });
    },

    formValid : function (validatedModel, invalid) {
      if(!validatedModel) return this.done();

      var self = this;
      this.model[this.action](validatedModel.attributes, function (result, data, status) {
        if(result) { return self.done(); }
        invalid('Something went wrong');
      });
    },

    destroy : function () {
      this.formView.destroy();
    },

    clear : function () {
      this.formView.clear();
    }

  });

  return Forms;

});