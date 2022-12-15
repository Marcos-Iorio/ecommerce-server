const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

export interface IUser {
  name: string;
  mail: string;
  password: string;
  street: string;
  city: string;
  country: string;
}

const prisma = new PrismaClient();

export const getUser = async (userData: IUser) => {
  await prisma.$connect();

  try {
    const user = await prisma.users.findFirst({
      where: {
        mail: userData.mail,
      },
    });
    if (user === null) {
      throw new Error("No user found!");
    }
    const passwordIsValid = bcrypt.compareSync(
      userData.password,
      user.password
    );

    if (!passwordIsValid) {
      throw new Error("Invalid password!");
    }
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.API_SECRET,
      { expiresIn: 86400 }
    );

    prisma.$disconnect();

    return {
      user: {
        id: user.id,
        mail: user.mail,
        name: user.name,
        role: user.role,
      },
      message: "Login successfull!",
      accessToken: token,
    };
  } catch (error: any) {
    prisma.$disconnect();
    return { accessToken: null, message: error.message };
  }
};

export const insertUser = async (userData: IUser) => {
  await prisma.$connect();

  try {
    const checkUsedMail = await prisma.users.findFirst({
      where: {
        mail: userData.mail,
      },
    });

    if (checkUsedMail != null) {
      prisma.$disconnect();
      throw new Error("Email already registered!");
    } else {
      const user = await prisma.users.create({
        data: {
          name: userData.name,
          mail: userData.mail,
          role: "USER",
          password: userData.password,
          street: userData.street,
          country: userData.country,
          city: userData.city,
        },
      });

      if (user) {
        prisma.$disconnect();
        return { message: "Account created!" };
      }
    }
  } catch (error: any) {
    prisma.$disconnect();
    return { message: error.message };
  }
};
