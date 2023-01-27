import dotenv from "dotenv";
import axios from "axios";

import { IProduct } from "../repositories/product";

dotenv.config();

interface IBuyerInfo {
  name: string;
  email: string;
  address: {
    street_name: string;
    zip_code: string;
    country: string;
    city: string;
  };
}

interface IProductInfo {
  title: string;
  description: string;
  quantity: number;
  price: string;
  category: string;
}

interface IProducts {
  products: Array<IProductInfo>;
}

const tokenMercadoPago = {
  prod: {},
  test: {
    access_token: process.env.MELI_ACCESS_TOKEN,
  },
};

const mercadoPagoUrl = "https://api.mercadopago.com/checkout";

const createPaymentMercadoPago = async (
  { products }: IProducts,
  user: IBuyerInfo
) => {
  const url = `${mercadoPagoUrl}/preferences?access_token=${tokenMercadoPago.test.access_token}`;

  const items: any = [];

  products.forEach((product: IProductInfo) => {
    const item: IProductInfo = {
      title: "",
      description: "",
      quantity: 0,
      price: "",
      category: "",
    };

    item.title = product.title;
    item.description = product.title;
    item.category = product.category;
    item.price = product.price;
    item.quantity = Number(product.quantity);

    items.push(item);
  });

  const preferences = {
    items,
    external_reference: "ecommerce",
    payer: {
      name: user.name,
      email: user.email,
      address: {
        street: user.address.street_name,
        zip_code: user.address.zip_code,
        country: user.address.country,
        city: user.address.city,
      },
    },
    back_urls: {
      success: "https://localhost:3000/success",
      pending: "https://localhost:3000.com/pending",
      failure: "https://localhost:3000.com/error",
    },
    notification_url: "https://localhost:3000/webhook",
    auto_return: "approved",
  };

  try {
    const request = await axios.post(url, preferences, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return request.data;
  } catch (e) {
    console.log(e);
  }
};

export default createPaymentMercadoPago;
