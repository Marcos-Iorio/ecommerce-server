import { Context } from "./context";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { config } from "dotenv";
config();

interface CreateUser {
  name: string;
  mail: string;
  password: string;
  street: string;
  city: string;
  country: string;
}

export async function createUser(
  user: CreateUser,
  UExist: boolean,
  ctx: Context
) {
  if (!UExist) {
    const createdUser = await ctx.prisma.users.create({
      data: {
        name: user.name,
        mail: user.mail,
        role: "USER",
        password: user.password,
        street: user.street,
        country: user.country,
        city: user.city,
      },
    });

    return { message: "Account created!" };
  } else {
    return new Error("Email already registered!");
  }
}

interface GetUser {
  mail: string;
  password: string;
}

export async function getUser(user: GetUser, ctx: Context) {
  try {
    const foundedUser = await ctx.prisma.users.findFirst({
      where: { mail: user.mail },
    });

    if (foundedUser === null) {
      throw new Error("No user found!");
    }

    const hashedPass = bcrypt.hashSync(foundedUser.password, 8);

    const passwordIsValid = bcrypt.compareSync(user.password, hashedPass);

    if (!passwordIsValid) {
      throw new Error("Invalid password!");
    }

    const token = jwt.sign(
      {
        id: foundedUser.id,
      },
      process.env.API_SECRET,
      { expiresIn: 86400 }
    );

    return {
      user: {
        id: foundedUser.id,
        mail: foundedUser.mail,
        name: foundedUser.name,
        role: foundedUser.role,
      },
      message: "Login successfull!",
      accessToken: token,
    };
  } catch (error: any) {
    return { accessToken: null, message: error.message };
  }
}
