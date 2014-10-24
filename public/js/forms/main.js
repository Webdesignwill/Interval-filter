define(function (require, exports, module) {
  module.exports = function () {
    return {
      baseUrl                                                        : '/js/forms',
      context                                                        : 'siteify_forms',
      paths : {

        text                                                            : '../libs/require/text.min',
        handlebars                                                 : '../libs/handlebars/handlebars',

        Forms                                                         : 'Forms',
        FormView                                                   : 'FormView',

        // User
        LoginModel                                                 : 'models/LoginModel',
        ProfileModel                                                : 'models/ProfileModel',
        RegisterModel                                              : 'models/RegisterModel',
        IntervalManagementModel                          : 'models/IntervalManagementModel'
      },
      deps : ['Forms']
    };
  };
});