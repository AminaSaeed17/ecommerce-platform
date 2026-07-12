import axios from "axios"
import { createContext, useEffect, useState } from "react"
// @ts-ignore
// eslint-disable-next-line react-refresh/only-export-components
export const productContext = createContext();

// @ts-ignore
export default function ProductContextProvider({children}) {

    let [products ,setProducts] = useState([]);

    async function getProducts(){
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        console.log(data)
        setProducts(data.data);
    }

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getProducts();
    },[])

  return <>
    <productContext.Provider value={{products}}>
        {children}
    </productContext.Provider>
  </>
}