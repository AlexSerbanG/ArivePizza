import * as React from 'react';
import { getPizzas, getToppings } from '../services/pizzaService';
import { Topping } from '../_context/types';
import { Pizza } from '../_mockData/pizzas';

export const usePizzas = () => {
  const [pizzas, setPizzas] = React.useState<Pizza[]>([]);
  const [toppings, setToppings] = React.useState<Topping[]>([]);

  React.useEffect(() => {
    getPizzas().then(data => setPizzas(data))
  },[]);

  React.useEffect(() => {
    getToppings().then(data => setToppings(data))
  },[]);

  return {
    pizzas,
    toppings,
  };
}
