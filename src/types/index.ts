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
}

enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface CartProduct extends Product{
    quantity:number;
}