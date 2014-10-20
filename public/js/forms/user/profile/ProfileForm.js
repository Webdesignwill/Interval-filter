
define([
  'Forms',
  'ProfileModel',
  'handlebars',
  'text!user/profile/templates/profile.tpl'
], function (Forms, ProfileModel, handlebars, template) {

  "use strict";

  var ProfileForm = Backbone.View.extend({

    formEls : {},
    events : {
      'submit' : 'submit',
      'click .delete-user' : 'delete'
    },

    initialize : function (options) {

      this.options = options;
      this.model = new ProfileModel();

      this.listenTo(this.model, 'validated', function (isValid, model, errors) {
        this.updateErrors(isValid, errors);
      });
      this.render();
    },

    render : function () {

      var tpl = handlebars.compile(template);
      var compiled = tpl(Forms.get('User').attributes);

      this.$el.html(compiled);

      this.setFormEls();
      return this;
    },

    delete : function (e) {
      e.preventDefault();
      Forms.get('User').deleteMe(function (result, data, status) {
        if(result) {return Forms.get('$broker').trigger('modal:close'); }
      });
    },

    submit : function (e) {
      e.preventDefault();

      var postData = {}, User = Forms.get('User'), val;
      for(var key in this.formEls) {
        val = this.formEls[key].$formEl.val();
        postData[key] = !val ? User.get(key) : val;
      }

      this.model.set(postData, {validate : true});

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

  return ProfileForm;

});