import { Request, Response } from "express";
import { Product } from "../models/productModel";

import { uploadMainImage, uploadImages } from "../services/uploadImages";

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  price: number;
}

const allProducts = async (req: Request, res: Response) => {
  const product = new Product();

  const response = await product.getAllProducts(req.body.pageNumber);

  res.status(200).send(response);
};

const getProductInfo = async (req: Request, res: Response) => {
  const { id } = req.body;
  const product = new Product();

  const response = await product.getProduct(id);

  res.status(200).send(response);
};

const newProduct = async (req: Request, res: Response) => {
  const product = new Product();

  const main_image = await uploadMainImage(req.body.main_image, req.body.name);

  const images = uploadImages(req.body.images, req.body.name);

  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    stock: req.body.stock,
    price: req.body.price,
    main_image: main_image,
    images: images,
  };

  const response = await product.insertProduct(newProduct);

  res.status(200).send(response);
};

const updateProduct = async (req: Request, res: Response) => {
  const product = new Product();

  const updatedProduct: IProduct = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    stock: req.body.stock,
    price: req.body.price,
  };

  const response = await product.update(updatedProduct);

  res.status(200).send(response);
};

const deleteProduct = async (req: Request, res: Response) => {
  const product = new Product();

  const { id } = req.body;

  const response = await product.delete(id);

  res.status(200).send(response);
};

export {
  allProducts,
  getProductInfo,
  newProduct,
  updateProduct,
  deleteProduct,
};
