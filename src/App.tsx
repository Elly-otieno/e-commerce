import { Toaster } from "react-hot-toast";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { CartContextProvider } from "./hooks/useCart";
import Router from "./router/Router";
import { useLocation } from "react-router";
import Nav from "./components/general/Nav";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(()=>{
    AOS.init({ duration: 1000 });
  },[])

  const showNavOn = ['/dashboard', '/dashboard/add-products', '/dashboard/manage-products', '/dashboard/manage-orders']
  return (
    <>
      <Toaster toastOptions={{
        style:{
          background: 'rgb(51 65 85)',
          color: '#ffffff',
        }
      }}/>
      <CartContextProvider>
        <div className="flex flex-col  min-h-screen">
          <Header />
          {showNavOn.includes(location.pathname) && user?.isAdmin && <Nav />}
          <main className="my-6 xl:px-20 md:px-2 px-4 flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
      </CartContextProvider>
    </>
  );
};

export default App;
