define(function (require, exports, module) {
  module.exports = function () {
    return {
      baseUrl                                         : '/js/forms',
      context                                         : 'siteify_forms',
      paths : {

        text                                             : '../libs/require/text.min',
        handlebars                                  : '../libs/handlebars/handlebars',

        Forms                                          : 'Forms',

        // User
        LoginForm                                    : 'user/login/LoginForm',
        LoginModel                                  : 'user/login/models/LoginModel',
        ProfileForm                                  : 'user/profile/ProfileForm',
        ProfileModel                                 : 'user/profile/models/ProfileModel',
        RegisterForm                                : 'user/register/RegisterForm',
        RegisterModel                               : 'user/register/models/RegisterModel',

        // Intervals
        AddIntervalForm                            : 'intervals/add/AddIntervalForm',
        AddIntervalModel                          : 'intervals/add/models/AddIntervalModel'
      },
      deps : ['Forms']
    };
  };
});