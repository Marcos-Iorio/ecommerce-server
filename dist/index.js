"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const login_1 = __importDefault(require("./src/routes/login"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("api/users", login_1.default);
app.listen(port, () => {
    console.log("Server running at 3000");
});
exports.default = app;
