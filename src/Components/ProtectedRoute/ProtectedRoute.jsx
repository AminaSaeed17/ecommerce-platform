import { Navigate } from "react-router-dom"

// @ts-ignore
export default function ProtectedRoute({children}) {
  if (localStorage.getItem('userToken')){
    return children
  } else {
    return <Navigate to={'/protectedPage'}/>
  }
}
