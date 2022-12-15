import { getAllProducts, getProductInfo } from "../repositories/product";
import { IProduct } from "../repositories/product";

class Product {
  async getAllProducts(pageNumber: number) {
    const response = await getAllProducts(pageNumber);

    return response;
  }

  async getProduct(id: string) {
    const response = await getProductInfo(id);
  }

  async insertProduct(product: IProduct) {}
}

export { Product };
