"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const login_1 = __importDefault(require("./src/routes/login"));
const products_1 = __importDefault(require("./src/routes/products"));
const orders_1 = __importDefault(require("./src/routes/orders"));
const payments_1 = __importDefault(require("./src/routes/payments"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/api/users", login_1.default);
app.use("/api/products", products_1.default);
app.use("/api/orders", orders_1.default);
app.use("/api/payments", payments_1.default);
app.listen(port, () => {
    console.log("Server running at 3000");
});
exports.default = app;
