import { PizzaSize, Topping, ToppingType } from "../_context/types";

export type Pizza = {
  id: number;
  name: string;
  imgSrc: string;
};

export const pizzas: Pizza[] = [
  {
    id: 1,
    name: "Quattro Formaggi",
    imgSrc:
      "https://www.pizzacasaromana.ro/wp-content/uploads/2020/06/Casa_Romana_11_Quattro_Formaggi.jpg",
  },
  {
    id: 2,
    name: "Quattro Staggioni",
    imgSrc:
      "https://www.anna-delivery.ro/image/cache/catalog/PIZZA/quatro%20stagioni-web-550x550w.jpg",
  },
  {
    id: 3,
    name: "Diavola",
    imgSrc:
      "https://images.trenta.ro/Products/Original/Diavola_-_Homepage_B-3224.jpg",
  },
  {
    id: 4,
    name: "Mexico",
    imgSrc:
      "https://www.anna-delivery.ro/image/cache/catalog/PIZZA/mexicana-web1-550x550w.jpg",
  },
];

export const toppings: Topping[] = [
  { type: ToppingType.Olives, name: "Olives", price: 3 },
  { type: ToppingType.Pepperoni, name: "Pepperoni", price: 4 },
  { type: ToppingType.Mushrooms, name: "Mushrooms", price: 2 },
  { type: ToppingType.Pepper, name: "Pepper", price: 2 },
];

export const pizaSizePriceMap: {
  [key: number]: number;
} = {
  [PizzaSize.small]: 15,
  [PizzaSize.medium]: 20,
  [PizzaSize.large]: 25,
};

export const pizzaSizeNameMap: {
  [key: number]: string;
} = {
  [PizzaSize.small]: 'small',
  [PizzaSize.medium]: 'medium',
  [PizzaSize.large]: 'large',
}
