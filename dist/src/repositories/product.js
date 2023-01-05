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
exports.insertNewProduct = exports.getProductInfo = exports.getAllProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllProducts = (pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    let itemsPerPage = 25 * pageNumber;
    try {
        const products = yield prisma.products.findMany({
            skip: 0,
            take: itemsPerPage,
        });
        if (products === null) {
            throw new Error("No products were found!");
        }
        return {
            results: products,
        };
    }
    catch (error) {
        return { message: error.message };
    }
});
exports.getAllProducts = getAllProducts;
const getProductInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    try {
        const productData = yield prisma.products.findFirst({
            where: {
                id: id,
            },
        });
        if (productData === null) {
            throw new Error("No product was found!");
        }
        return {
            data: productData,
        };
    }
    catch (error) {
        return { message: error.message };
    }
});
exports.getProductInfo = getProductInfo;
const insertNewProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    try {
        const checkProduct = yield prisma.products.findFirst({
            where: {
                name: product.name,
            },
        });
        if (checkProduct !== null) {
            throw new Error("Product already exists!");
        }
        const productData = yield prisma.products.create({
            data: {
                name: product.name,
                description: product.description,
                category: product.category,
                main_image: product.main_image,
                images: product.images,
                stock: product.stock,
                price: product.price,
            },
        });
        if (productData) {
            return {
                message: `${productData.name} was inserted succesfully!`,
            };
        }
    }
    catch (error) {
        return { message: error.message };
    }
});
exports.insertNewProduct = insertNewProduct;
