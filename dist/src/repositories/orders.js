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
exports.getUserOrders = exports.updateOrderStatus = exports.createOrder = exports.getAllOrders = void 0;
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const prisma = new client_1.PrismaClient();
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    prisma.$connect();
    try {
        const orders = yield prisma.orders.findMany();
        if (orders === null) {
            throw new Error("They are not orders yet!");
        }
        return orders;
    }
    catch (e) {
        return { error: true, message: e.message };
    }
});
exports.getAllOrders = getAllOrders;
const createOrder = (orderInfo) => __awaiter(void 0, void 0, void 0, function* () {
    prisma.$connect();
    const orderId = (0, crypto_1.randomUUID)();
    try {
        const order = prisma.orders.create({
            data: {
                order_id: orderId,
                user_name: orderInfo.buyer,
                email: orderInfo.email,
                products: orderInfo.products,
                total_price: Number(orderInfo.total),
                order_timestamp: new Date(),
                payment_status: "PENDING",
                address: {
                    street: orderInfo.street,
                    city: orderInfo.city,
                    country: orderInfo.country,
                },
            },
        });
        if (order == null) {
            throw new Error("There was an error placing the order. Try again later.");
        }
        return {
            error: false,
            message: `Order ${orderId} was created successfully, we will send the details to your email. Once you pay is approved we will ship your order.`,
        };
    }
    catch (e) {
        return { error: true, message: e.message };
    }
});
exports.createOrder = createOrder;
const updateOrderStatus = (orderId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    prisma.$connect();
    try {
        const updatedOrder = yield prisma.orders.update({
            where: {
                order_id: orderId,
            },
            data: {
                payment_status: newStatus,
            },
        });
        if (updatedOrder === null) {
            throw new Error("There was a problem updating the status of payment.");
        }
        return {
            error: false,
            message: `Status changed to ${newStatus}`,
        };
    }
    catch (e) {
        return { error: true, message: e.message };
    }
});
exports.updateOrderStatus = updateOrderStatus;
const getUserOrders = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    prisma.$connect();
    try {
        const orders = prisma.orders.findMany({
            where: {
                email: userEmail,
            },
        });
        if (orders === null) {
            throw new Error("No orders were found!");
        }
        return { error: false, orders: orders };
    }
    catch (e) {
        return { error: true, message: e.message };
    }
});
exports.getUserOrders = getUserOrders;
