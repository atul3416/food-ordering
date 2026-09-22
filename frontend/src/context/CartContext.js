import React from 'react'
import { createContext, useContext, useState } from 'react'

const CartContext = createContext();

export const CartProvider = ({children}) =>{
    const [cartCount, setCartCount] = useState(0);
    return(
        <CartContext.Provider value={{cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = ()=> useContext(CartContext);

// const CartContext = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default CartContext
