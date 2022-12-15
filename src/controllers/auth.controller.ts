import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

import { User } from "../models/userModel";

const login = async (req: Request, res: Response) => {
  const user = new User(
    req.body.name,
    req.body.mail,
    req.body.password,
    req.body.street,
    req.body.country,
    req.body.city
  );

  const response = await user.login(user);

  res.status(200).send(response);
};

const register = async (req: Request, res: Response) => {
  const user = new User(
    req.body.name,
    req.body.mail,
    bcrypt.hashSync(req.body.password, 8),
    req.body.street,
    req.body.country,
    req.body.city
  );

  const response = await user.register(user);

  res.status(200).header("auth-token").send(response);
};

export { login, register };
