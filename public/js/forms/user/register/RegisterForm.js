
define([
  'RegisterModel',
  'handlebars',
  'text!user/register/templates/register.tpl'
], function (RegisterModel, handlebars, template) {

  "use strict";

  var RegisterForm = Backbone.View.extend({

    formEls : {},
    events : {
      'submit' : 'submit'
    },

    initialize : function (options, validCallback) {

      this.display = options.display;
      this.validCallback = validCallback;
      this.serverModel = options.serverModel;

      this.model = new RegisterModel();

      this.listenTo(this.model, 'validated', function (isValid, model, errors) {
        this.updateErrors(isValid, errors);
      });
      this.render();
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(this.display);
      this.$el.html(compiled);
      this.setFormEls();
      return this;
    },

    submit : function (e) {
      e.preventDefault();
      var self = this;

      this.model.set({
        email : this.formEls.email.$formEl.val(),
        displayname : this.formEls.displayname.$formEl.val(),
        password : this.formEls.password.$formEl.val(),
        confirmpassword : this.formEls.confirmpassword.$formEl.val()
      }, {validate : true});

      if(this.model.isValid()) {
        this.validCallback(this.model, function (message) {
          self.serverError(message);
        });
      }
    },

    serverError : function (message) {
      alert(message);
    },

    setFormEls : function () {

      var validation = this.model.validation,
            $el,
            validatables = [];

      for(var key in validation) {
        $el = this.$el.find('[name="' + key + '"]');
        if($el) validatables.push($el);
      }

      for(var i = 0; i<validatables.length; i++) {
        var $validatable = $(validatables[i]),
              $formGroup = $validatable.closest('.form-group'),
              $label = $validatable.prev('label');

        this.formEls[$validatable.attr('name')] = {
          $formEl : $validatable,
          $label : $label,
          labelText : $label.html(),
          $formGroup : $formGroup
        };
      }
    },

    updateErrors : function (isValid, errors) {
      this.$el[!isValid ? 'addClass' : 'removeClass']('invalid');
      for(var key in this.formEls) {
        this.formEls[key].$formGroup[errors[key] ? 'addClass' : 'removeClass']('has-error');
        this.formEls[key].$label.html(errors[key] ? errors[key] : this.formEls[key].labelText);
      }
    },

    destroy : function () {
      this.stopListening();
      this.$el.off();
      this.$el.empty();
    }

  });

  return RegisterForm;

});