export type Product ={
    id: string;
    name: string;
    description: string;
    priceInCents: number;
    imageUrl: string;
    rating: number;
    brand: string;
    model: string;
    color: string;
    categories:string[];

}

export type OrderProduct={
    id:string,
    product:Product[],
    order:Order,
    quantity:number,
    subTotalInCents:number,
    imageUrl:string,
}

export type Order={
    id:string,
    user:User,
    totalInCents:number,
    createdAt:Date,
    orderStatus:string,
    orderProduct:[],
    payment:Payment,
}

export type Payment={
    id:string,
    order:Order,
    paymentStatus:string
}

export type User={
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
    accessToken:string;
}

enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface CartProduct extends Product{
    quantity:number;
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