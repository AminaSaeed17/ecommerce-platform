
// import Typography from "@mui/material/Typography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import Register from "./Components/Register/Register";
import SignIn from "./Components/SignIn/SignIn";
import UserContextProvider from "./Components/Context/UserContext";
import ProtectedPage from "./Components/ProtectedPage/ProtectedPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ForgetPass from "./Components/ForgetPass/ForgetPass";
// import ResetPass from "./Components/ResetPass/ResetPass";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPass/ResetPass";
import ProductContextProvider from "./Components/Context/ProductContext";


const router = createHashRouter([{
  path: '',element: <Layout/> ,children: [
    {index: true, element: <Register/>},
    {path: 'signin', element: <SignIn/>},
    {path: 'forgetPass', element: <ForgetPass/>},
    {path: 'verifyCode', element: <VerifyCode/>},
    {path: 'ResetPass', element: <ResetPassword/>},
    {path: 'protectedPage', element: <ProtectedPage/>},
    {path: 'home', element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path: 'products', element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path: 'brands', element: <ProtectedRoute><Brands/></ProtectedRoute>},
    {path: 'category', element: <ProtectedRoute><Categories/></ProtectedRoute>},
    {path: 'cart', element: <ProtectedRoute><Cart/></ProtectedRoute>},
  ]
}])

function App() {
  const [theme, colorMode] = useMode();
  return (

    <ProductContextProvider>
       <UserContextProvider>
    <ColorModeContext.Provider 
// @ts-ignore
     value={colorMode}>
      <ThemeProvider 
// @ts-ignore
      theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  </UserContextProvider>
    </ProductContextProvider>
   

    
  )
}

export default App
