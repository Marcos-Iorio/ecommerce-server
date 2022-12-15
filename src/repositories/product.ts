import { Prisma, PrismaClient } from "@prisma/client";

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

    return {};
  } catch (error) {
    return { message: error.message };
  }
};
