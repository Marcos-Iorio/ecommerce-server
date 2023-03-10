"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("../controllers/orders.controller");
const router = express_1.default.Router();
router.post("/new-order", orders_controller_1.newOrder);
router.get("/all", orders_controller_1.allOrders);
exports.default = router;
