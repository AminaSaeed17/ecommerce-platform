import axios from "axios";
import { createContext, useEffect, useState } from "react";

// @ts-ignore
// eslint-disable-next-line react-refresh/only-export-components
export const categoryContext = createContext();

// @ts-ignore
export default function CategoryContextProvider({children}) {
      const [category, setCategory] = useState([]);
      const [loading, setLoading] = useState(true);
    async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories",
    );
    setCategory(data.data);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCategories();
  }, []);
  return <>
    <categoryContext.Provider value={{category,loading}}>
            {children}
    </categoryContext.Provider>
  </>
}
