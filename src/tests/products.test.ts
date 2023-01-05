import { MockContext, Context, createMockContext } from "./context";
import {
  createProduct,
  getProductInfo,
  updateProduct,
  deleteProduct,
} from "./product-functions";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

describe("POST /api/product/new-product", () => {
  it("should create a new product", async () => {
    const product = {
      id: "1",
      name: "New Product",
      description: "New Product Description",
      price: 1200,
      stock: 10,
      main_image:
        "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw1f3fadd0/products/AD_GU1883/AD_GU1883-1.JPG",
      images: [
        "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw1f3fadd0/products/AD_GU1883/AD_GU1883-1.JPG",
        "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw1f3fadd0/products/AD_GU1883/AD_GU1883-1.JPG",
      ],
      category: "bath",
    };

    const productExist = false;

    mockCtx.prisma.products.create.mockResolvedValue(product);

    expect(createProduct(product, productExist, ctx)).resolves.toEqual({
      message: `${product.name} was inserted succesfully`,
    });
  });

  it("should return product already exists", async () => {
    const product = {
      id: "1",
      name: "New Product",
      description: "New Product Description",
      price: 1200,
      stock: 10,
      main_image:
        "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw1f3fadd0/products/AD_GU1883/AD_GU1883-1.JPG",
      images: [
        "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw1f3fadd0/products/AD_GU1883/AD_GU1883-1.JPG",
        "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw1f3fadd0/products/AD_GU1883/AD_GU1883-1.JPG",
      ],
      category: "bath",
    };

    const productExist = true;

    mockCtx.prisma.products.create.mockRejectedValue(
      new Error("Product already exists!")
    );

    expect(createProduct(product, productExist, ctx)).resolves.toEqual(
      new Error("Product already exists!")
    );
  });
});

describe("GET api/products/:id", () => {
  it("should return a product info", async () => {
    const product = {
      id: "ObjectId(63aca354152faa40e8ea96af)",
      name: "New Product",
      description: "New Product Description",
      price: 1200,
      stock: 10,
      main_image:
        "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw1f3fadd0/products/AD_GU1883/AD_GU1883-1.JPG",
      images: [
        "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw1f3fadd0/products/AD_GU1883/AD_GU1883-1.JPG",
        "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw1f3fadd0/products/AD_GU1883/AD_GU1883-1.JPG",
      ],
      category: "bath",
    };

    mockCtx.prisma.products.findFirst.mockResolvedValue(product);

    await expect(getProductInfo(product, ctx)).resolves.toEqual({
      data: expect.anything(),
    });
  });

  it("should return no product found", async () => {
    const product = {
      id: "63aca354152faa40e8ea96af",
      name: "New Product",
      description: "New Product Description",
      price: 1200,
      stock: 10,
      main_image:
        "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw1f3fadd0/products/AD_GU1883/AD_GU1883-1.JPG",
      images: [
        "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw1f3fadd0/products/AD_GU1883/AD_GU1883-1.JPG",
        "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw1f3fadd0/products/AD_GU1883/AD_GU1883-1.JPG",
      ],
      category: "bath",
    };

    mockCtx.prisma.products.findFirst.mockRejectedValue(
      new Error("No product found!")
    );

    expect(getProductInfo(product, ctx)).resolves.toEqual({
      message: "No product found!",
    });
  });
});

describe("UPDATE api/product/update", () => {
  it("should update the product info", async () => {
    const product = {
      id: "63aca354152faa40e8ea96af",
      name: "New Product",
      description: "New Product Description",
      price: 1200,
      stock: 10,
      main_image: "",
      images: [],
      category: "bath",
    };

    mockCtx.prisma.products.update.mockResolvedValue(product);

    await expect(updateProduct(product, ctx)).resolves.toEqual({
      message: `${product.name} updated successfully!`,
    });
  });

  it("should return product doens't exists", async () => {
    const product = {
      id: "63aca354152faa40e8ea96af",
      name: "New Product",
      description: "New Product Description",
      price: 1200,
      stock: 10,
      main_image: "",
      images: [],
      category: "bath",
    };

    mockCtx.prisma.products.update.mockRejectedValue(
      new Error("Product doesn't exists")
    );

    await expect(updateProduct(product, ctx)).resolves.toEqual({
      message: "Product doesn't exists",
    });
  });
});

describe("DELETE api/product/delete", () => {
  it("should delete product", async () => {
    const product = {
      id: "63aca354152faa40e8ea96af",
      name: "New Product",
      description: "New Product Description",
      price: 1200,
      stock: 10,
      main_image: "",
      images: [],
      category: "bath",
    };

    mockCtx.prisma.products.delete.mockResolvedValue(product);

    await expect(deleteProduct(product, ctx)).resolves.toEqual({
      message: "Product has been deleted!",
    });
  });

  it("should fail to delete product", async () => {
    const product = {
      id: "63aca354152faa40e8ea96af",
      name: "New Product",
      description: "New Product Description",
      price: 1200,
      stock: 10,
      main_image: "",
      images: [],
      category: "bath",
    };

    mockCtx.prisma.products.delete.mockRejectedValue(
      new Error("An error has ocurred! The product cannot be deleted!")
    );

    await expect(deleteProduct(product, ctx)).resolves.toEqual({
      message: "An error has ocurred! The product cannot be deleted!",
    });
  });
});
