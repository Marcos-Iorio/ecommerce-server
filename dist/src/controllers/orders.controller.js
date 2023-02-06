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
exports.getUserOrders = exports.updateOrder = exports.newOrder = exports.allOrders = void 0;
const orders_model_1 = require("../models/orders.model");
const allOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = new orders_model_1.Orders();
    const response = yield orders.allOrders();
    return res.status(200).send(response);
});
exports.allOrders = allOrders;
const newOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = new orders_model_1.Orders();
    const response = yield orders.new_order(req.body);
    return res.status(200).send(response);
});
exports.newOrder = newOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = new orders_model_1.Orders();
    const { orderId, newStatus } = req.body;
    const response = yield orders.updateOrderStatus(orderId, newStatus);
    res.status(200).send(response);
});
exports.updateOrder = updateOrder;
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req.params;
    const orders = new orders_model_1.Orders();
    const response = yield orders.userOrders(userEmail);
    res.status(200).send(response);
});
exports.getUserOrders = getUserOrders;
