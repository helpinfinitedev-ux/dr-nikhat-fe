export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  lastPurchase: Date;
  purchaseQuantity: number;
  role: "customer" | "admin";
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  offer: number;
  boughtQuantity: number;
  imageUrls: string[];
  discountedPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
