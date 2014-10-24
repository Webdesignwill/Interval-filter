
define([
  'require',
  'handlebars'
], function (require, handlebars, template) {

  "use strict";

  var FormView = Backbone.View.extend({

    events : {
      'submit' : 'submit'
    },

    initialize : function (options, validCallback) {
      this.formEls = {};

      this.display = options.display;
      this.validCallback = validCallback;
      this.serverModel = options.serverModel;

      var self = this;
      this.loadModel(options.name, function (name) {
        self.loadTemplate(name);
      });
    },

    loadModel : function (name, callback) {
      var self = this;
      this.loader({ load : name + 'Model' }, function (Model) {
        self.model = new Model();

        self.listenTo(self.model, 'validated', function (isValid, model, errors) {
          self.updateErrors(isValid, errors);
        });

        callback(name);
      });
    },

    loadTemplate : function (name) {
      var self = this;
      this.loader({ load : 'text!templates/' + name.toLowerCase() + '.tpl'}, function (template) {
        self.render(template);
      });
    },

    loader : function (options, callback) {
      var self = this;
      require([options.load], function (Module) {
        callback(Module);
      });
    },

    render : function (template) {
      var tpl = handlebars.compile(template);
      var compiled = tpl(this.display);
      this.$el.html(compiled);
      this.setFormEls();
      return this;
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

    parseSet : function (persist) {
      var key, props = {}, val;
      for(key in this.formEls) {
        val = this.formEls[key].$formEl.val();
        props[key] = persist && !val ? this.serverModel.get(key) : val;
      }
      return props;
    },

    submit : function (e) {
      e.preventDefault();
      var self = this;

      this.model.set(this.parseSet(this.model.get('persist')), {validate : true});

      if(this.model.isValid()) {
        this.validCallback(this.model, function (message) {
          self.serverError(message);
        });
      }
    },

    serverError : function (message) {
      alert(message);
    },

    updateErrors : function (isValid, errors) {
      this.$el[!isValid ? 'addClass' : 'removeClass']('invalid');
      for(var key in this.formEls) {
        this.formEls[key].$formGroup[errors[key] ? 'addClass' : 'removeClass']('has-error');
        this.formEls[key].$label.html(errors[key] ? errors[key] : this.formEls[key].labelText);
      }
    },

    clear : function () {
      for(var key in this.formEls) {
        this.formEls[key].$formEl.val('');
      }
    },

    destroy : function () {
      this.stopListening();
      this.$el.off();
      this.$el.empty();
    }

  });

  return FormView;

});