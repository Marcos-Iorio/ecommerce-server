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
const dotenv_1 = __importDefault(require("dotenv"));
const mercadopago = require("mercadopago");
dotenv_1.default.config();
mercadopago.configure({
    access_token: process.env.MELI_ACCESS_TOKEN,
});
const createPaymentMercadoPago = (products) => __awaiter(void 0, void 0, void 0, function* () {
    const items = [];
    products.forEach((product) => {
        const item = {
            id: "",
            title: "",
            description: "",
            quantity: 0,
            unit_price: 0,
            category: "",
        };
        item.id = product.id;
        item.title = product.title;
        item.description = product.description;
        item.category = product.category;
        item.unit_price = Number(product.unit_price);
        item.quantity = Number(product.quantity);
        items.push(item);
    });
    const preferences = {
        items,
    };
    const response = yield mercadopago.preferences.create(preferences);
    const preferenceId = response.body.id;
    return preferenceId;
});
exports.default = createPaymentMercadoPago;
