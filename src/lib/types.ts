export type Role = 'vendor' | 'supplier';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  availability: boolean;
  imageUrl: string;
  imageHint: string;
  supplierId: string;
  supplierName: string;
  description: string;
  reviews: Review[];
  rating: number;
};

export type Review = {
  id: string;
  vendorId: string;
  vendorName: string;
  rating: number;
  comment: string;
  date: string;
};

export type OrderStatus = 'Pending' | 'Approved' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Draft';

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  vendorId: string;
  items: (Product & { quantity: number; })[] | OrderItem[];
  total: number;
  status: OrderStatus;
  orderDate: string;
  deliveryDate?: string;
};
