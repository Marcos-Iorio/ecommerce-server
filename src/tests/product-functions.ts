import { Context } from "./context";

interface CreateProduct {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  main_image: string;
  images: Array<string>;
  category: string;
}

export const createProduct = async (
  product: CreateProduct,
  prodExists: boolean,
  ctx: Context
) => {
  if (!prodExists) {
    const createdProduct = ctx.prisma.products.create({
      data: {
        name: product.name,
        description: product.description,
        main_image: product.main_image,
        images: product.images,
        stock: product.stock,
        price: product.price,
        category: product.category,
      },
    });

    return { message: `${product.name} was inserted succesfully` };
  } else {
    return new Error("Product already exists!");
  }
};

interface ProductInfo {
  id: string;
  name: string;
}

export const getProductInfo = async (product: ProductInfo, ctx: Context) => {
  try {
    const productInfo = await ctx.prisma.products.findFirst({
      where: { id: product.id },
    });

    if (productInfo === null) {
      throw new Error("No product found!");
    }

    return {
      data: productInfo,
    };
  } catch (error: any) {
    return { message: error.message };
  }
};

interface UpdateProduct {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  category: string;
}

export const updateProduct = async (product: UpdateProduct, ctx: Context) => {
  try {
    const updatedProduct = await ctx.prisma.products.update({
      where: { id: product.id },
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

    return {
      message: `${product.name} updated successfully!`,
    };
  } catch (error: any) {
    return { message: error.message };
  }
};

interface DeleteProduct {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  category: string;
}

export const deleteProduct = async (product: DeleteProduct, ctx: Context) => {
  try {
    const deletedProduct = await ctx.prisma.products.delete({
      where: {
        id: product.id,
      },
    });

    if (deletedProduct === null) {
      throw new Error("An error has ocurred! The product cannot be deleted!");
    }

    return {
      message: "Product has been deleted!",
    };
  } catch (error: any) {
    return { message: error.message };
  }
};
