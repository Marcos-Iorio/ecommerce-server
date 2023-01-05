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
exports.newProduct = exports.getProductInfo = exports.allProducts = void 0;
const productModel_1 = require("../models/productModel");
const uploadImages_1 = require("../services/uploadImages");
const allProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new productModel_1.Product();
    const response = yield product.getAllProducts(req.body.pageNumber);
    res.status(200).send(response);
});
exports.allProducts = allProducts;
const getProductInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const product = new productModel_1.Product();
    const response = yield product.getProduct(id);
    res.status(200).send(response);
});
exports.getProductInfo = getProductInfo;
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new productModel_1.Product();
    const main_image = yield (0, uploadImages_1.uploadMainImage)(req.body.main_image, req.body.name);
    const images = (0, uploadImages_1.uploadImages)(req.body.images, req.body.name);
    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
        price: req.body.price,
        main_image: main_image,
        images: images,
    };
    const response = yield product.insertProduct(newProduct);
    res.status(200).send(response);
});
exports.newProduct = newProduct;
