import { PrismaClient } from "@prisma/client";
import { Product } from "../models/productModel";

export interface IProduct {
  name: string;
  description: string;
  category: string;
  stock: number;
  price: number;
  main_image: string;
  images: Array<string>;
}

interface UpdateProduct extends Omit<IProduct, "main_image" | "images"> {
  id?: string;
}

const prisma = new PrismaClient();

export const getAllProducts = async (pageNumber: number) => {
  await prisma.$connect();

  let itemsPerPage = 25 * pageNumber;

  try {
    const products = await prisma.products.findMany({
      skip: 0,
      take: itemsPerPage,
    });

    if (products === null) {
      throw new Error("No products were found!");
    }

    return {
      results: products,
    };
  } catch (error: any) {
    return { message: error.message };
  }
};

export const getProductInfo = async (id: string) => {
  await prisma.$connect();

  try {
    const productData = await prisma.products.findFirst({
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
  } catch (error: any) {
    return { message: error.message };
  }
};

export const insertNewProduct = async (product: IProduct) => {
  await prisma.$connect();

  try {
    const checkProduct = await prisma.products.findFirst({
      where: {
        name: product.name,
      },
    });

    if (checkProduct !== null) {
      throw new Error("Product already exists!");
    }

    const productData = await prisma.products.create({
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
  } catch (error: any) {
    return { message: error.message };
  }
};

export const updateProduct = async (product: UpdateProduct) => {
  await prisma.$connect();

  try {
    const updatedProduct = await prisma.products.update({
      where: {
        id: product.id,
      },
      data: {
        name: product.name,
        description: product.description,
        category: product.category,
        stock: product.stock,
        price: product.price,
      },
    });

    if (updatedProduct === null) {
      throw new Error("Product doesn't exists");
    }

    return { message: `${product.name} updated successfully!` };
  } catch (error: any) {
    return { message: error.message };
  }
};

export const deleteProduct = async (id: string) => {
  await prisma.$connect();

  try {
    const deletedProduct = await prisma.products.delete({
      where: {
        id: id,
      },
    });

    if (deletedProduct === null) {
      throw new Error("An error has ocurred! The product cannot be deleted!");
    }

    return {
      message: "Product has been deleted!",
    };
  } catch (error: any) {
    return {
      message: error.message,
    };
  }
};
