// passport strategy configuration
import passport from 'passport'
import CONFIG from '../config/db'
import User from '../models/User'
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = passport => {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.auth_secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
               return done(err, false);
            }
            if (user) {
              let { _id, username, firstName, lastName } = user
              return done(null, {_id, username, firstName, lastName});
            } else {
                return done(null, false);
            }
        });
    }));
}

/** jwt_payload._doc._id */