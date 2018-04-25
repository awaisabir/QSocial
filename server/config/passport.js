// passport strategy configuration
import passport from 'passport';
const { User } = require('../db/index').default;

const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = passport => {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET;
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      let user = await User.getUserById(jwt_payload.id);
      
      if (user.length === 0)
        return done(null, false);

      user = user[0];
      const { id, username, firstName, lastName } = user;
      return done(null, {id, username, firstName, lastName});
      
    } catch (error) {
      return done(error, false);
    }
  }));
};