import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
import { getUserById, getUserbyUsername } from "../db/queries.js";
const LocalStrategy = passportLocal.Strategy;

const customFields = {
  usernameField: "username",
  passwordField: "pw",
};

passport.use(
  new LocalStrategy(customFields, async (username, password, done) => {
    try {
      const user = await getUserbyUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const matchPw = await bcrypt.compare(password, user.pw);
      if (!matchPw) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
