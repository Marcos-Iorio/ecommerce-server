"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const router = express_1.default.Router();
router.get("/all", product_controller_1.allProducts);
router.get("/:id", product_controller_1.getProductInfo);
router.post("/new-product", product_controller_1.newProduct);
router.post("/update", product_controller_1.updateProduct);
router.post("/delete", product_controller_1.deleteProduct);
exports.default = router;
