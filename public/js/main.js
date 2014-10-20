
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

    BodyView                                  : 'display/public/body/BodyView',

    FretboardView                           : 'display/public/fretboard/FretboardView',
    FretView                                    : 'display/public/fretboard/FretView',
    FretModel                                  : 'display/public/fretboard/model/FretModel',

    NavBarView                               : 'display/public/navbar/NavBarView',

    MatchCountView                       : 'display/public/matchCount/MatchCountView',
    ModalView                                 : 'display/public/modal/ModalView',

    ListItemView                              : 'display/public/filteredList/ListItemView',
    ListParentView                           : 'display/public/filteredList/ListParentView',

    LoginView                                 : 'display/admin/user/LoginView',
    RegisterView                             : 'display/admin/user/RegisterView',
    ProfileView                                : 'display/admin/user/ProfileView',

    DescriptionView                        : 'display/public/description/DescriptionView',

    ControlBoardView                      : 'display/public/controlBoard/ControlBoardView',
    ButtonView                                : 'display/public/buttons/ButtonView',

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