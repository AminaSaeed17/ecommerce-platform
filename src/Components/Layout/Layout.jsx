import ScrollToUp from "../Scroll/ScrollToUp";
import Footer from "../Footer/Footer";
import Header1 from "../Navbar/Header1";
import Header2 from "../Navbar/Header2";
import Header3 from "../Navbar/Header3";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return <>
    <Header1/>
    <Header2/>
    <Header3/>
    <Outlet/>
    <Footer/>
    <ScrollToUp/>
  </>
}
