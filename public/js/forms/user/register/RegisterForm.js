
define([
  'RegisterModel',
  'text!user/register/templates/register.tpl'
], function (RegisterModel, template) {

  "use strict";

  var RegisterForm = Backbone.View.extend({

    formEls : {},
    events : {
      'submit' : 'submit'
    },

    initialize : function (options) {

      this.options = options;
      this.model = new RegisterModel();

      this.listenTo(this.model, 'validated', function (isValid, model, errors) {
        this.updateErrors(isValid, errors);
      });
      this.render();
    },

    render : function () {
      this.$el.html(template);
      this.setFormEls();
      return this;
    },

    submit : function (e) {
      e.preventDefault();

      this.model.set({
        email : this.formEls.email.$formEl.val(),
        displayname : this.formEls.displayname.$formEl.val(),
        password : this.formEls.password.$formEl.val(),
        confirmpassword : this.formEls.confirmpassword.$formEl.val()
      }, {validate : true});

      if(this.model.isValid()) {
        this.options.callback(this.model);
      }
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
    }

  });

  return RegisterForm;

});