import { MockContext, Context, createMockContext } from "./context";
import { createUser, getUser } from "./user-functions";

import { users } from "@prisma/client";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

describe("POST /users/login", () => {
  test("should return successfull text", async () => {
    const testUser: users = {
      id: "1",
      name: "marcos",
      mail: "marcos@test.com",
      password: "123",
      country: "argentina",
      city: "avellaneda",
      street: "street123",
      role: "USER",
    };
    mockCtx.prisma.users.findFirst.mockResolvedValue(testUser);

    await expect(getUser(testUser, ctx)).resolves.toEqual({
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
    const testUser: users = {
      id: "1",
      name: "marcos",
      mail: "marcos@test.com",
      password: "123",
      country: "argentina",
      city: "avellaneda",
      street: "street123",
      role: "USER",
    };
    mockCtx.prisma.users.findFirst.mockRejectedValue(
      new Error("Invalid password!")
    );

    await expect(getUser(testUser, ctx)).resolves.toEqual({
      message: "Invalid password!",
      accessToken: null,
    });
  });

  test("should return no user found", async () => {
    const testUser: users = {
      id: "1",
      name: "marcos",
      mail: "marcos@test.com",
      password: "123",
      country: "argentina",
      city: "avellaneda",
      street: "street123",
      role: "USER",
    };
    mockCtx.prisma.users.findFirst.mockRejectedValue(
      new Error("No user found!")
    );
    await expect(getUser(testUser, ctx)).resolves.toEqual({
      accessToken: null,
      message: "No user found!",
    });
  });
});

describe("POST users/register", () => {
  test("should register the user", async () => {
    const testCreateUser: users = {
      id: "1",
      name: "marcos",
      mail: "marcos1124324@test.com",
      password: "123",
      country: "argentina",
      city: "avellaneda",
      street: "street123",
      role: "USER",
    };
    const userExists = false;

    mockCtx.prisma.users.create.mockResolvedValue(testCreateUser);

    await expect(createUser(testCreateUser, userExists, ctx)).resolves.toEqual({
      message: "Account created!",
    });
  });

  test("should return email already registered", async () => {
    const testCreateUser = {
      id: "1",
      name: "marcos",
      mail: "marcos@test.com",
      password: "123",
      country: "argentina",
      city: "avellaneda",
      street: "street123",
      role: "USER",
    };

    const userExists = true;

    mockCtx.prisma.users.create.mockRejectedValue(
      new Error("Email already registered!")
    );

    await expect(createUser(testCreateUser, userExists, ctx)).resolves.toEqual(
      new Error("Email already registered!")
    );
  });
});
