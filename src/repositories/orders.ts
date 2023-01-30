import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

interface Order {
  user_name: string;
  email: string;
  products: string[];
  total_price: number;
  timestamp: Date;
  status: string;
  address: string;
}

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

const createOrder = async (orderInfo: Order) => {
  prisma.$connect();

  const orderId = randomUUID();

  try {
    const order = prisma.orders.create({
      data: {
        order_id: orderId,
        user_name: orderInfo.user_name,
        email: orderInfo.email,
        products: orderInfo.products,
        total_price: orderInfo.total_price,
        order_timestamp: new Date(),
        status: "PENDING",
        address: orderInfo.address,
      },
    });

    if (order == null) {
      throw new Error("There was an error placing the order. Try again later.");
    }

    return {
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
  } catch (e: any) {}
};

export { getAllOrders, createOrder };
