import { createContext } from "react";

const CartContext = createContext({
  productos: [],
  total: 0,
  count: 0
})

export default CartContext;