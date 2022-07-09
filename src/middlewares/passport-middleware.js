import passport from "passport";
import { User } from "../models/index.js";
import passportJwt from "passport-jwt";
import { SECRET as secretOrKey } from "../constants/index.js";

const { Strategy, ExtractJwt } = passportJwt;

const opts = {
  secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      let user = await User.findById(id);
      if (!user) {
        throw new Error("User not found.");
      }
      return done(null, user.getUserInfo());
    } catch (err) {
      done(null, false);
    }
  })
);
