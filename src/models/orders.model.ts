import {
  getAllOrders,
  createOrder,
  updateOrderStatus,
  getUserOrders,
} from "../repositories/orders";

import { updateStock } from "../repositories/product";
import { IOrders, IUpdateStock } from "../types";

interface UpdateStock extends Omit<IOrders, "products"> {
  products: IUpdateStock[];
}

class Orders {
  async allOrders() {
    const response = await getAllOrders();

    return response;
  }

  async new_order(orderInfo: any) {
    const response = await createOrder(orderInfo);

    const { products } = orderInfo;

    if (!response.error) {
      updateStock(products);
    }
  }

  async updateOrderStatus(orderId: string, newStatus: string) {
    const response = await updateOrderStatus(orderId, newStatus);

    return response;
  }

  async userOrders(orderId: string) {
    const response = await getUserOrders(orderId);

    return response;
  }
}

export { Orders };
