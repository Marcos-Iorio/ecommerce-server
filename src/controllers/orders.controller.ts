import { Response, Request } from "express";

import { Orders } from "../models/orders.model";

const allOrders = async (req: Request, res: Response) => {
  const orders = new Orders();

  const response = await orders.allOrders();
  return res.status(200).send(response);
};

const newOrder = async (req: Request, res: Response) => {
  const orders = new Orders();

  const response = await orders.new_order(req.body);
  return res.status(200).send(response);
};

const updateOrder = async (req: Request, res: Response) => {
  const orders = new Orders();

  const { orderId, newStatus } = req.body;

  const response = await orders.updateOrderStatus(orderId, newStatus);

  res.status(200).send(response);
};

const getOrderDetail = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const orders = new Orders();

  const response = await orders.userOrders(orderId);

  res.status(200).send(response);
};

export { allOrders, newOrder, updateOrder, getOrderDetail };
