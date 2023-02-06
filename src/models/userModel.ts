import { getUser, insertUser } from "../repositories/user";
import { IUser } from "../types";

class User {
  name: string;
  mail: string;
  password: string;
  street: string;
  country: string;
  city: string;

  constructor(
    name: string,
    mail: string,
    password: string,
    street: string,
    country: string,
    city: string
  ) {
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.street = street;
    this.country = country;
    this.city = city;
  }

  async login(user: IUser) {
    const response = await getUser(user);
    return response;
  }

  async register(user: IUser) {
    const response = await insertUser(user);
    return response;
  }
}
export { User };
