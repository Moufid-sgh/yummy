import { Outlet, useNavigation } from "react-router-dom";
import Navbar from './src/components/nav/Navbar';
import Footer from "./src/components/Footer";
import { Toaster } from "@/components/ui/sonner"
import ScrollToTop from "@/components/ScrollToTop";


const Layout = () => {

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <ScrollToTop />
      <Navbar />
      {isLoading && <div className="flex items-center justify-center min-h-screen"><p className="loader"></p></div>}
      <div className="content arapey ">
        <Outlet />
      </div>
      <Toaster />
      <Footer />
    </>
  );
};

export default Layout;
