
var base_require = require.config({

  baseUrl : './js/',
  context : 'base_require',

  packages: [{
    name : 'forms',
    location : 'forms'
  }],

  paths : {

    jquery                                       : 'libs/jquery/jquery.min',
    Backbone                                  : 'libs/backbone/backbone.min',
    Validation                                 : 'libs/backbone/backbone.validation.min',
    underscore                                : 'libs/underscore/underscore.min',
    handlebars                                : 'libs/handlebars/handlebars',
    text                                           : 'libs/require/text.min',
    domReady                                 : 'libs/require/domReady',
    bootstrap                                  : 'libs/bootstrap/bootstrap.min',

    App                                            : 'app',

    BodyView                                  : 'views/body/BodyView',

    FretboardView                           : 'views/fretboard/FretboardView',
    FretView                                    : 'views/fretboard/FretView',
    FretModel                                  : 'views/fretboard/model/FretModel',

    NavBarView                               : 'views/navbar/NavBarView',

    MatchCountView                       : 'views/matchCount/MatchCountView',
    ModalView                                 : 'views/modal/ModalView',

    ListItemView                              : 'views/filteredList/ListItemView',
    ListParentView                           : 'views/filteredList/ListParentView',

    LoginView                                 : 'views/admin/LoginView',
    RegisterView                             : 'views/admin/RegisterView',
    ProfileView                                : 'views/admin/ProfileView',

    DescriptionView                        : 'views/description/DescriptionView',

    ControlsView                             : 'views/controls/ControlsView',
    ButtonView                                : 'views/buttons/ButtonView',

    ScalesCollection                        : 'collections/ScalesCollection',
    SelectionCollection                   : 'collections/SelectionCollection',

    ScaleModel                                : 'models/ScaleModel',
    UserModel                                 : 'models/UserModel',
    Oauth2Model                             : 'models/Oauth2Model'

  },
  shim : {
    'Backbone' : {
      deps : ['jquery', 'underscore', 'handlebars'],
      exports : "Backbone"
    },
    'handlebars' : {
      exports: 'Handlebars'
    },
    'bootstrap' : {
      deps : ['jquery'],
      exports : 'bootstrap'
    }
  },
  deps : ['jquery', 'underscore', 'App', 'domReady', 'bootstrap', 'Validation'],
  callback : function ($, _, App, domReady) {

    // Mix in the validation for all models
    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

    domReady(function() {
      App.init();
    });
  }
});