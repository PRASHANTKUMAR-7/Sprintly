const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const env = require('../config/env');
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');
const { auth } = require('../utils/validators');
const authenticate = require('../middleware/auth');

router.post('/signup', validate(auth.signup), authController.signup);
router.post('/login', validate(auth.login), authController.login);
router.post('/refresh', validate(auth.refresh), authController.refresh);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.me);
router.put('/me', authenticate, validate(auth.updateMe), authController.updateMe);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${env.clientUrl}/login?oauth_error=google_authentication_failed`,
  }),
  authController.googleCallback
);

module.exports = router;
