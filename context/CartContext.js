import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext({});

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      console.log("action: ", action);
      const updatedItems = [...state.items, action.payload];
      const updatedTotal = updatedItems.reduce((sum, item) => {
        return sum + item.price
      }, 0);
      return {
        ...state,
        items: updatedItems,
        total: updatedTotal,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
