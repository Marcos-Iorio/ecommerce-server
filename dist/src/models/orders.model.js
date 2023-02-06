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
exports.Orders = void 0;
const orders_1 = require("../repositories/orders");
const product_1 = require("../repositories/product");
class Orders {
    allOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, orders_1.getAllOrders)();
            return response;
        });
    }
    new_order(orderInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, orders_1.createOrder)(orderInfo);
            const { products } = orderInfo;
            if (!response.error) {
                (0, product_1.updateStock)(products);
            }
        });
    }
    updateOrderStatus(orderId, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, orders_1.updateOrderStatus)(orderId, newStatus);
            return response;
        });
    }
    userOrders(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, orders_1.getUserOrders)(email);
            return response;
        });
    }
}
exports.Orders = Orders;
