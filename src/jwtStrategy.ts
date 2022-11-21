import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import datasource from "./datasource";
import { User } from "./user.entity";

passport.use(
  "jwt",
  new Strategy(
    {
      secretOrKey: "secret",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwtPayload, cb) => {
      const repository = datasource.getRepository(User);

      const user = await repository.findOne({ where: { id: jwtPayload.id } });

      if (!user) {
        return cb({ message: "Invalid token" });
      }

      return cb(null, { id: user.id, email: user.email });
    }
  )
);
