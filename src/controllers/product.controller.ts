import { Request, Response } from "express";
import { Product } from "../models/productModel";

const allProducts = async (req: Request, res: Response) => {
  const product = new Product();

  const response = await product.getAllProducts(req.body.pageNumber);
};
