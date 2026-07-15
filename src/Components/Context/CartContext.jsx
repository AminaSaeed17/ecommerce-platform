import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

// @ts-ignore
// eslint-disable-next-line react-refresh/only-export-components
export const cartContext = createContext();

// @ts-ignore
export default function CartContextProvider({children}) {

    const Headers = localStorage.getItem("userToken");

    const [cart, setToCart] = useState([]);
      // eslint-disable-next-line no-unused-vars
      const [loading, setLoading] = useState(true);
    // @ts-ignore
    async function addProductToCart(productId) {

        try{
             let { data } = await axios.post(
      // @ts-ignore
      "https://ecommerce.routemisr.com/api/v1/cart",{ productId }, {headers:{
        token:Headers
      }}
    );
    setToCart(data);
    console.log(data)
    setLoading(false);
    toast.success(data.message);
        } catch(err){
            // @ts-ignore
            console.log(err.message)
            // @ts-ignore
            toast.error(err.message)
        }
   
  }

  return <>
    <cartContext.Provider value={{cart,addProductToCart}}>
                {children}
    </cartContext.Provider>
  </>
}
