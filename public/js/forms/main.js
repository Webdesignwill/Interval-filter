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
        LoginModel                                                 : 'types/login/LoginModel',
        ProfileModel                                                : 'types/profile/ProfileModel',
        RegisterModel                                              : 'types/register/RegisterModel',
        IntervalManagementModel                          : 'types/intervalManagement/IntervalManagementModel'
      },
      deps : ['Forms']
    };
  };
});