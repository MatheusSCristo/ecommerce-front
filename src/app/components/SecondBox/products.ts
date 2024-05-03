import { Product } from "@/types";

export const sneakers: Product[] = [
  {
    id: "1",
    name: "Nike Air Max 90",
    description: "Iconic Nike sneakers with Air cushioning",
    priceInCents: 12000, // $120.00
    imageUrl: "",
    rating: 4.5,
    brand: "Nike",
    model: "Air Max 90",
    color: "White/Black",
    categories: ["Running", "Lifestyle"],
    createdAt: new Date("2023-01-15"),
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46]
  },
  {
    id: "2",
    name: "Adidas UltraBoost",
    description: "Comfortable Adidas running shoes with Boost cushioning",
    priceInCents: 16000, // $160.00
    imageUrl: "",
    rating: 4.7,
    brand: "Adidas",
    model: "UltraBoost",
    color: "Black/White",
    categories: ["Running", "Sport"],
    createdAt: new Date("2023-02-28"),
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46]
  },
  {
    id: "3",
    name: "New Balance 574",
    description: "Classic New Balance sneakers with ENCAP cushioning",
    priceInCents: 8000, // $80.00
    imageUrl: "",
    rating: 4.2,
    brand: "New Balance",
    model: "574",
    color: "Navy/White",
    categories: ["Lifestyle"],
    createdAt: new Date("2023-03-10"),
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46]
  },
  {
    id: "4",
    name: "Puma RS-X",
    description: "Stylish Puma sneakers with RS cushioning",
    priceInCents: 10000, // $100.00
    imageUrl: "",
    rating: 4.3,
    brand: "Puma",
    model: "RS-X",
    color: "Black/Yellow",
    categories: ["Lifestyle", "Fashion"],
    createdAt: new Date("2023-04-05"),
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46]
  },
  {
    id: "5",
    name: "Reebok Classic Leather",
    description: "Timeless Reebok sneakers with leather upper",
    priceInCents: 7000, // $70.00
    imageUrl: "",
    rating: 4.0,
    brand: "Reebok",
    model: "Classic Leather",
    color: "White/Gum",
    categories: ["Lifestyle", "Casual"],
    createdAt: new Date("2023-05-20"),
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46]
  }
];

