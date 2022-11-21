import { Router } from "express";
import bcrypt from "bcrypt";
import datasource from "./datasource";
import { User } from "./user.entity";
import passport from "passport";
import jwt from "jsonwebtoken";

export const router = Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 10);
  const result = await datasource.getRepository(User).save({
    email,
    password: encryptedPassword,
  });
  res.json({
    id: result.id,
    email: result.email,
  });
});

router.post("/login", passport.authenticate("local"), async (req, res) => {
  const token = jwt.sign(
    { id: req.user!.id, email: req.user!.email },
    "secret"
  );
  res.json({ token });
});
