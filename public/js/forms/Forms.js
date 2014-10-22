
define([
  'require'
], function (require) {

  "use strict";

  var Forms = Backbone.Model.extend({

    model : {},
    done : Function,
    form : {},

    init : function (model, options, done) {
      this.model = model;
      this.action = options.action;
      this.done = done;

      this.loadForm(options);
    },

    loadForm : function (options) {
      var self = this;
      require([options.name + 'Form'], function (Form) {
        self.form = new Form({
          el : options.el,
          serverModel : self.model,
          display : self.model.attributes
        }, function valid (validatedModel, invalid) {
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
      this.form.destroy();
    }

  });

  return Forms;

});