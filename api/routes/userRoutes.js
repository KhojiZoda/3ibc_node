module.exports = function(app){
  const user = require('../controllers/userController');
  const jwtMiddleware = require('../../middleware/jwtMiddleware');

  app.post('/register', user.user_register);
  app.post('/login', user.user_login);

  app.get('/user', user.user_index);
  app.route('/user/:email')
    .get(user.user_show)
    .patch(jwtMiddleware.verify_token, user.user_update)
    .delete(jwtMiddleware.verify_token, user.user_destroy);
}
