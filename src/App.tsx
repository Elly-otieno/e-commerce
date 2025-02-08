import { Toaster } from "react-hot-toast";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { CartContextProvider } from "./hooks/useCart";
import Router from "./router/Router";

const App = () => {
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
          <main className="my-6 mx-auto xl:px-20 md:px-2 px-4 flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
      </CartContextProvider>
    </>
  );
};

export default App;
