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
    return "";
  }

  async new_order(orderInfo: any) {
    const response = await createOrder(orderInfo);

    const { products } = orderInfo;

    if (!response.error) {
      updateStock(products);
    }
  }
}

export { Orders };
