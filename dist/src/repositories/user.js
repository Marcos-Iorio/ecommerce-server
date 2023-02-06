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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = exports.getUser = void 0;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const getUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    try {
        const user = yield prisma.users.findFirst({
            where: {
                email: userData.mail,
            },
        });
        if (user === null) {
            throw new Error("No user found!");
        }
        const passwordIsValid = bcrypt.compareSync(userData.password, user.password);
        if (!passwordIsValid) {
            throw new Error("Invalid password!");
        }
        const token = jwt.sign({
            id: user.id,
        }, process.env.API_SECRET, { expiresIn: 86400 });
        prisma.$disconnect();
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            message: "Login successfull!",
            accessToken: token,
        };
    }
    catch (error) {
        prisma.$disconnect();
        return { accessToken: null, message: error.message };
    }
});
exports.getUser = getUser;
const insertUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    try {
        const checkUsedMail = yield prisma.users.findFirst({
            where: {
                email: userData.mail,
            },
        });
        if (checkUsedMail != null) {
            prisma.$disconnect();
            throw new Error("Email already registered!");
        }
        else {
            const user = yield prisma.users.create({
                data: {
                    name: userData.name,
                    email: userData.mail,
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
    }
    catch (error) {
        prisma.$disconnect();
        return { message: error.message };
    }
});
exports.insertUser = insertUser;
