import express from "express";
import { allProducts, getProductInfo } from "../controllers/product.controller";

const router = express.Router();

router.get("/all", allProducts);

router.get("/:id", getProductInfo);

export default router;
