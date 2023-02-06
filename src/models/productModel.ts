import {
  deleteProduct,
  getAllProducts,
  getProductInfo,
  insertNewProduct,
  updateProduct,
} from "../repositories/product";

import { IProduct } from "../types";

interface UpdateProduct {
  id?: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  price: number;
}

class Product {
  async getAllProducts(pageNumber: number) {
    const response = await getAllProducts(pageNumber);

    return response;
  }

  async getProduct(id: string) {
    const response = await getProductInfo(id);
    return response;
  }

  async insertProduct(product: IProduct) {
    const response = await insertNewProduct(product);
    return response;
  }

  async update(product: UpdateProduct) {
    const response = await updateProduct(product);

    return response;
  }

  async delete(id: string) {
    const response = await deleteProduct(id);

    return response;
  }
}

export { Product };
