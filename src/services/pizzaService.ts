import { Topping } from "../_context/types";
import { Pizza, pizzas, toppings } from "../_mockData/pizzas";

export const getPizzas:() => Promise<Pizza[]> = () => new Promise(res => {
  return res(pizzas)
});

export const getToppings: () => Promise<Topping[]> = () => new Promise(res => {
  return res(toppings);
});
