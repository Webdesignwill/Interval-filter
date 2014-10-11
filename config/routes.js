
var Controllers = require('./../app/controllers');

module.exports = function (app) {

  /* Oauth
  ==================================== */
  app.post('/api/oauth/token', app.oauth.grant());

  /* User
  ==================================== */
  app.post('/api/user/session', Controllers.User.session);
  app.post('/api/user/register', Controllers.User.register);
  app.get('/api/user/me', app.oauth.authorise(), Controllers.User.getMe);
  app.delete('/api/user/me', app.oauth.authorise(), Controllers.User.deleteMe);
  app.put('/api/user/me', app.oauth.authorise(), Controllers.User.putMe);
  app.post('/api/user/logout', Controllers.User.logout);

  /* Scale
  ==================================== */
  app.post('/api/scale/add', Controllers.Scale.add);
  app.get('/api/scale/all', Controllers.Scale.all);
  app.put('/api/scale/update', Controllers.Scale.update);
  app.delete('/api/scale/delete', Controllers.Scale.delete);

};