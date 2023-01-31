import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

import { IOrders } from "../types";

const getAllOrders = async () => {
  prisma.$connect();

  try {
    const orders = await prisma.orders.findMany();

    if (orders === null) {
      throw new Error("They are not orders yet!");
    }

    return orders;
  } catch (e: any) {
    return { error: true, message: e.message };
  }
};

const createOrder = async (orderInfo: IOrders) => {
  prisma.$connect();

  const orderId = randomUUID();

  try {
    const order = prisma.orders.create({
      data: {
        order_id: orderId,
        user_name: orderInfo.buyer,
        email: orderInfo.email,
        products: orderInfo.products,
        total: orderInfo.total,
        order_timestamp: new Date(),
        status: "PENDING",
        address: orderInfo.address,
      },
    });

    if (order == null) {
      throw new Error("There was an error placing the order. Try again later.");
    }

    return {
      error: false,
      message: `Order ${orderId} was created successfully, we will send the details to your email. Once you pay is approved we will ship your order.`,
    };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
};

const updateOrderStatus = async (orderId: string, newStatus: string) => {
  prisma.$connect();

  try {
    const updatedOrder = await prisma.orders.update({
      where: {
        order_id: orderId,
      },
      data: {
        status: newStatus,
      },
    });

    if (updatedOrder === null) {
      throw new Error("There was a problem updating the status of payment.");
    }

    return {
      error: false,
      message: `Status changed to ${newStatus}`,
    };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
};

const getUserOrders = async (userEmail: string) => {
  prisma.$connect();

  try {
    const orders = prisma.orders.findMany({
      where: {
        email: userEmail,
      },
    });

    if (orders === null) {
      throw new Error("No orders were found!");
    }

    return { error: false, orders: orders };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
};

export { getAllOrders, createOrder, updateOrderStatus, getUserOrders };
