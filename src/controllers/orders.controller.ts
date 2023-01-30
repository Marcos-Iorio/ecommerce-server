import { Response, Request } from "express";

import { Orders } from "../models/orders.model";

export interface IOrders {
  order_number: string;
  products: string[];
  buyer: string;
  total: string;
  status: string;
  adress_to_ship: string;
  timestamp: string;
}

const allOrders = async (req: Request, res: Response) => {
  const orders = new Orders();

  const response = await orders.allOrders();
  return res.status(200).send(response);
};

const newOrder = async (req: Request, res: Response) => {
  const orders = new Orders();

  const response = await orders.new_order();
  return res.status(200).send(response);
};

export { allOrders, newOrder };
