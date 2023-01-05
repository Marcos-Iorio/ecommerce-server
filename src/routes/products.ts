import express from "express";
import {
  allProducts,
  getProductInfo,
  newProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/all", allProducts);

router.get("/:id", getProductInfo);

router.post("/new-product", newProduct);

router.post("/update", updateProduct);

router.post("/delete", deleteProduct);

export default router;
