import * as React from "react";
import { CartContextValue, Product } from "./types";

export const CartContext = React.createContext<CartContextValue>({
  products: [],
  addToCart: () => {},
  clearCart: () => {},
});

export const useCartContext = () => React.useContext(CartContext);

export const CartContextProvider: React.FC = ({ children }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  return (
    <CartContext.Provider
      value={{
        products,
        addToCart: (product: Product) => {
          setProducts((prevProds) => [...prevProds, product]);
        },
        clearCart: () => setProducts([]),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
