const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/User');
const env = require('./env');

passport.use(
  new GoogleStrategy(
    {
      clientID: env.google.clientId,
      clientSecret: env.google.clientSecret,
      callbackURL: env.google.callbackUrl,
      scope: ['profile', 'email'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        const googleId = profile.id;
        const avatar = profile.photos?.[0]?.value || '';

        const existingUser = await User.findOne({ googleId });
        if (existingUser) {
          return done(null, existingUser);
        }

        const emailUser = email ? await User.findOne({ email }) : null;
        if (emailUser) {
          emailUser.googleId = googleId;
          if (avatar && !emailUser.avatarUrl) {
            emailUser.avatarUrl = avatar;
          }
          await emailUser.save();
          return done(null, emailUser);
        }

        const newUser = await User.create({
          email,
          googleId,
          firstName: profile.name?.givenName || '',
          lastName: profile.name?.familyName || '',
          avatarUrl: avatar,
          emailVerified: true,
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
