import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// @ts-ignore
// eslint-disable-next-line react-refresh/only-export-components
export const cartContext = createContext();

// @ts-ignore
export default function CartContextProvider({children}) {

    const Headers = localStorage.getItem("userToken");

    const [cart, setToCart] = useState(null);
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
    getProductCart();
    console.log(data.data)
    setLoading(false);
    toast.success(data.message);
        } catch(err){
            // @ts-ignore
            console.log(err.message)
            // @ts-ignore
            toast.error(err.message)
        }
   
  }
    async function getProductCart() {

        try{
             let { data } = await axios.get(
      // @ts-ignore
      "https://ecommerce.routemisr.com/api/v2/cart", {headers:{
        token:Headers
      }}
    );
    setToCart(data);
    console.log(data.data)
    setLoading(false);
        } catch(err){
            // @ts-ignore
            console.log(err.message)
        }
   
  }
    // @ts-ignore
    async function updateProductCart(productId, count) {

        try{
             let { data } = await axios.put(
      // @ts-ignore
      `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,{
        count
      }, {headers:{
        token:Headers
      }}
    );
    setToCart(data);
    console.log(data.data)
    setLoading(false);
    toast.success(data.status)
        } catch(err){
            // @ts-ignore
            console.log(err.message)
        }
   
  }
    // @ts-ignore
    async function deleteProductCart(productId) {

        try{
             let { data } = await axios.delete(
      // @ts-ignore
      `https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {headers:{
        token:Headers
      }}
    );
    setToCart(data);
    // console.log(data.data)
    setLoading(false);
    toast.success(data.status)
        } catch(err){
            // @ts-ignore
            console.log(err.message)
        }
   
  }

  useEffect(()=>{
      getProductCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <cartContext.Provider value={{cart,addProductToCart, getProductCart, deleteProductCart,loading, updateProductCart}}>
                {children}
    </cartContext.Provider>
  </>
}
