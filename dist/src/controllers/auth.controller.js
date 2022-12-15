"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel_1 = require("../models/userModel");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userModel_1.User(req.body.name, req.body.mail, req.body.password, req.body.street, req.body.country, req.body.city);
    const response = yield user.login(user);
    res.status(200).send(response);
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userModel_1.User(req.body.name, req.body.mail, bcrypt.hashSync(req.body.password, 8), req.body.street, req.body.country, req.body.city);
    const response = yield user.register(user);
    res.status(200).header("auth-token").send(response);
});
exports.register = register;
