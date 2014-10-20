
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

  /* Interval
  ==================================== */
  app.post('/api/interval/add', Controllers.Interval.add);
  app.get('/api/interval/all', Controllers.Interval.all);
  app.put('/api/interval/update', Controllers.Interval.update);
  app.delete('/api/interval/delete', Controllers.Interval.delete);

};