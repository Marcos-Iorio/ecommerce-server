import { PrismaClient } from "@prisma/client";

export interface IProduct {
  name: string;
  description: string;
  stock: number;
  price: number;
  main_image: string;
  images: Array<string>;
}

const prisma = new PrismaClient();

export const getAllProducts = async (pageNumber: number) => {
  await prisma.$connect();

  let itemsPerPage = 25 * pageNumber;

  try {
    const products = await prisma.product.findMany({
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
    const productData = await prisma.product.findFirst({
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
    const checkProduct = await prisma.product.findFirst({
      where: {
        name: product.name,
      },
    });

    if (checkProduct !== null) {
      prisma.$disconnect();
      throw new Error("Product already exists!");
    }

    const productData = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
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
    prisma.$disconnect();
    return { message: error.message };
  }
};
