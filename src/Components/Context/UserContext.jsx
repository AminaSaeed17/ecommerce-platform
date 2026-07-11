import { createContext, useEffect, useState } from "react"


// @ts-ignore
// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext();

// @ts-ignore
export default function UserContextProvider({children}) {
    const [userToken, setUserToken] =useState(null)
    useEffect(()=> {
        if(localStorage.getItem('userToken')){
            // @ts-ignore
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUserToken(localStorage.getItem('userToken'));
        }
    },[])
  return <>
    <userContext.Provider value={{userToken, setUserToken}}>
        {children}
    </userContext.Provider>
  </>
}
