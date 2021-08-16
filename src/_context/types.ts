export type UserInfo = {
  name: string;
  address: Address;
  phone: string;
};

export type Address = {
  streetName: string;
  houseNumber: string;
  postalCode: string;
  cityId: number;
};

export type City = {
  id: number;
  name: string;
};

export type UserContextValue = {
  user: UserInfo;
  updateUser: (user: UserInfo) => Promise<void>;
  isValid: boolean;
};

export type CartContextValue = {
  products: Product[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
};

export type Product = {
  id: number,
  size: PizzaSize,
  toppings: Topping[],
};

export enum PizzaSize {
  small,
  medium,
  large
}

export type Topping = {
  type: ToppingType;
  price: number;
  name: string;
}

export enum ToppingType {
  Olives,
  Pepperoni,
  Mushrooms,
  Pepper,
};
