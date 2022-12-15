import { Request, Response } from "express";
import { Product } from "../models/productModel";

const allProducts = async (req: Request, res: Response) => {
  const product = new Product();

  const response = await product.getAllProducts(req.body.pageNumber);

  res.status(200).send(response);
};

const getProductInfo = async (req: Request, res: Response) => {
  const { id } = req.body;
  const product = new Product();

  const response = await product.getProduct(id);
};

const newProduct = async (req: Request, res: Response) => {
  const product = new Product();

  product.insertProduct(req.body);
};

export { allProducts, getProductInfo, newProduct };
