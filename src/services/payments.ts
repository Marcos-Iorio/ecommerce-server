import dotenv from "dotenv";
const mercadopago = require("mercadopago");

dotenv.config();

interface IProductInfo {
  id: string;
  title: string;
  description: string;
  quantity: number;
  unit_price: number;
  category: string;
}

interface IProducts {
  products: Array<IProductInfo>;
}

mercadopago.configure({
  access_token: process.env.MELI_ACCESS_TOKEN,
});

const createPaymentMercadoPago = async (products: any) => {
  const items: any = [];

  products.forEach((product: IProductInfo) => {
    const item: IProductInfo = {
      id: "",
      title: "",
      description: "",
      quantity: 0,
      unit_price: 0,
      category: "",
    };

    item.id = product.id;
    item.title = product.title;
    item.description = product.description;
    item.category = product.category;
    item.unit_price = Number(product.unit_price);
    item.quantity = Number(product.quantity);

    items.push(item);
  });

  const preferences = {
    items,
  };

  const response = await mercadopago.preferences.create(preferences);
  const preferenceId = response.body.id;

  return preferenceId;
};

export default createPaymentMercadoPago;
