import request from "supertest";
import app from "../../index";
import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
dotenv.config();

const prisma = new PrismaClient();

beforeEach(() => {
  prisma.$connect();
});

describe("POST /users/login", () => {
  test("should return successfull text", async () => {
    const testUser = {
      mail: "marcos@test.com",
      password: "123",
    };

    const response = await request(app).post("/users/login").send(testUser);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      user: {
        id: expect.anything(),
        mail: "marcos@test.com",
        name: "marcos",
        role: "USER",
      },
      message: "Login successfull!",
      accessToken: expect.anything(),
    });
  });

  test("should return invalid password", async () => {
    const testUser = {
      mail: "marcos@test.com",
      password: "1234",
    };

    const response = await request(app).post("/users/login").send(testUser);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      accessToken: null,
      message: "Invalid password!",
    });
  });

  test("should return no user found", async () => {
    const testUser = {
      mail: "marcostest@test.com",
      password: "1234",
    };

    const response = await request(app).post("api/users/login").send(testUser);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      accessToken: null,
      message: "No user found!",
    });
  });
});

describe("POST users/register", () => {
  test("should register the user", async () => {
    const testUser = {
      mail: "mateo1@test.com",
      password: "1234",
      name: "mateo",
      country: "Argentina",
      city: "CABA",
      street: "street 123",
    };

    const response = await request(app).post("/users/register").send(testUser);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Account created!",
    });
  });

  test("should return email already registered", async () => {
    const testUser = {
      mail: "marcos@test.com",
      password: "1234",
      name: "marcos",
      country: "Argentina",
      city: "CABA",
      street: "street 123",
    };

    const response = await request(app).post("/users/register").send(testUser);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Email already registered!",
    });
  });
});
