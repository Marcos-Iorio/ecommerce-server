export interface IProduct {
  name: string;
  description: string;
  category: string;
  stock: number;
  price: number;
  main_image: string;
  images: string[];
}

export interface UpdateProduct extends Omit<IProduct, "main_image" | "images"> {
  id?: string;
}

export interface IUpdateStock {
  id: string;
  quantity: number;
}

export interface IOrders {
  city: any;
  country: any;
  street: any;
  order_number: string;
  products: IProduct[];
  buyer: string;
  email: string;
  total: string;
  status: Status;
  address: {
    street: string;
    city: string;
    country: string;
  };
  timestamp: string;
}

export enum Status {
  "APPROVED",
  "PENDING",
  "CANCELLED",
}

export interface IUser {
  name: string;
  mail: string;
  password: string;
  street: string;
  city: string;
  country: string;
}
