import { Response, Request } from "express";

import { Orders } from "../models/orders.model";

const allOrders = async (req: Request, res: Response) => {
  const orders = new Orders();

  const response = await orders.allOrders();
  return res.status(200).send(response);
};

const newOrder = async (req: Request, res: Response) => {
  const orders = new Orders();

  const { orderInfo } = req.body;

  const response = await orders.new_order(orderInfo);
  return res.status(200).send(response);
};

export { allOrders, newOrder };
