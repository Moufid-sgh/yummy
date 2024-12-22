import { Outlet, useNavigation } from "react-router-dom";
import Navbar from './src/components/nav/Navbar';
import Footer from "./src/components/Footer";
import { Toaster } from "@/components/ui/sonner"


const Layout = () => {

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";



  return (
    <>
      <Navbar />
      {isLoading && <div className="flex items-center justify-center h-screen"><ImSpinner9 className="animate-spin text-[#6C8F5D]" size={34} /></div>}
      <div className="content arapey">
        <Outlet />
      </div>
      <Toaster />
      <Footer />
    </>
  );
};

export default Layout;
