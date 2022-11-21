import passport from "passport";
import datasource from "./datasource";
import { User } from "./user.entity";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: Express.User, done) => done(null, user));

passport.use(
  "local",
  new Strategy({ usernameField: "email" }, async (email, password, cb) => {
    const repository = datasource.getRepository(User);

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return cb({ message: "Incorrect email or password." });
    }

    const isPasswordMatching = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatching) {
      return cb({ message: "Incorrect email or password." });
    }

    return cb(null, user);
  })
);
