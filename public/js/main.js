
var base_require = require.config({

  baseUrl : '/js/',
  context : 'base_require',

  paths : {

    jquery                                       : 'libs/jquery/jquery.min',
    Backbone                                  : 'libs/backbone/backbone.min',
    Validation                                 : 'libs/backbone/backbone.validation.min',
    underscore                                : 'libs/underscore/underscore.min',
    handlebars                                : 'libs/handlebars/handlebars',
    text                                           : 'libs/require/text.min',
    domReady                                 : 'libs/require/domReady',

    app                                            : 'app',

    BodyView                                  : 'views/body/BodyView',

    FretboardView                           : 'views/fretboard/FretboardView',
    FretView                                    : 'views/fretboard/FretView',
    FretModel                                  : 'views/fretboard/model/FretModel',

    ListItemView                              : 'views/results/ListItemView',
    ListParentView                           : 'views/results/ListParentView',
    DescriptionView                        : 'views/results/DescriptionView',

    ControlsView                             : 'views/controls/ControlsView',
    ButtonView                                : 'views/buttons/ButtonView'

  },
  shim : {
    'Backbone' : {
      deps : ['jquery', 'underscore', 'handlebars'],
      exports : "Backbone"
    },
    'handlebars' : {
      exports: 'Handlebars'
    }
  },
  deps : ['jquery', 'underscore', 'app', 'domReady', 'Validation'],
  callback : function ($, _, app, domReady) {

    // Mix in the validation for all models
    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

    domReady(function() {
      app.init();
    });
  }
});