"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcrypt = require("bcryptjs");
const userModel_1 = require("../models/userModel");
const login = (req, res) => {
    const user = new userModel_1.User("Marcos", "12", "1", "1", "1", "1");
    const userObject = user.login(user.mail);
    const response = checkPassword(userObject.hashed, user.password);
    res.status(200).json(response);
};
exports.login = login;
const register = (req, res) => {
    const user = new userModel_1.User("Marcos", "12", "1", "1", "1", "1");
    const hashedPassword = hashPassword(user.password);
    const response = user.create();
    res.status(200).json(response);
};
exports.register = register;
const hashPassword = (pw) => {
    bcrypt.hash(pw, 8, (err, hash) => {
        return hash;
    });
};
