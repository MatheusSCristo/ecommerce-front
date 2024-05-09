export type Product = {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  imagesUrl: string[];
  ratings: Rating[];
  brand: string;
  model: string;
  colors: string[];
  categories: string[];
  createdAt:string;
  sizes: number[];
};

export type Rating={
  userId:string;
  rating:number;
  comment:string;
  productId:string;
  orderId:string;
}

export type OrderProduct = {
  id: string;
  product: Product[];
  order: Order;
  quantity: number;
  subTotalInCents: number;
  imageUrl: string;
};

export interface Order extends OrderResponse {
  id: string;
}
export type OrderResponse = {
  id: string;
  user: User;
  totalInCents: number;
  createdAt: Date;
  orderStatus: string;
  orderProduct: OrderProductResponse[];
  payment: PaymentResponse;
  ratings: Rating[];
};

export type PaymentResponse = {
  id: string;
  paymentStatus: string;
  orderId: string;
};

export type OrderProductResponse = {
  id: string;
  productId: string;
  quantity: string;
  subtotalInCents: number;
  imagesUrl: string[];
  size: number;
  rating:Rating
};

export type Payment = {
  id: string;
  order: Order;
  paymentStatus: string;
};

export type User = {
  id: string;
  name: string;
  lastName: string;
  age: number;
  email: string;
  verifiedEmail: boolean;
  password: string;
  role: Role;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
  orders: Order[];
  accessToken: string;
};

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type CartProduct = {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  imagesUrl: string[];
  rating: number;
  brand: string;
  model: string;
  color: string;
  categories: string[];
  createdAt:Date;
  size: number;
  quantity: number;
}

export type cepResponseType = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export type citiesOptionType = {
  stateId: string;
  name: string;
};

export type orderDto = {
  products: orderProductDto[];
  clientId: string;
  shippingFeeInCents: number;
  billingDetailsDto: billingDetailsDto;
};

export type orderProductDto = {
  productId: string;
  quantity: number;
};
export type billingDetailsDto = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  cep: string;
  city: string;
  street: string;
  neighborhood: string;
};
