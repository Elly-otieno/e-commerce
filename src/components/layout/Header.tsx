import { Link } from "react-router";
import { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  ShoppingCart,
  Menu,
  X,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react";
import { useCart } from "../../hooks/useCart";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { cartTotalQty } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="shadow-md sticky top-0 z-50 w-full bg-slate-200">
      <div className="py-4 flex justify-between items-center xl:mx-20 md:mx-2 mx-4">
        <div className="text-2xl font-bold">
          <Link to="/">Exclusive</Link>
        </div>

        {/* Navigation Links for large screens */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-cyan-900 transition duration-200">
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-cyan-900 transition duration-200"
          >
            Featured
          </Link>
        </div>

        <div className="relative flex gap-4 justify-center items-center">
          <div className="relative" ref={menuRef}>
            {/* User Icon */}
            <div
              className="flex items-center justify-center p-2 bg-white rounded-full cursor-pointer hover:bg-gray-200 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              <User size={20} />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border p-2">
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  <LayoutDashboard size={18} className="mr-2" />
                  Dashboard
                </Link>
                <div className="border-t my-2"></div>
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="flex items-center p-2 w-full text-red-500 hover:bg-gray-100 rounded"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    state={{ from: location.pathname }}
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <User size={18} className="mr-2" />
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
          <Link to="/cart">
            <ShoppingCart size={24} />
            {cartTotalQty > 0 && (
              <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white rounded-full text-xs px-2 py-1">
                {cartTotalQty}
              </span>
            )}
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className=" focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 space-y-4 bg-slate-200">
          <Link
            to="/"
            className="block hover:text-cyan-900 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block hover:text-cyan-900 transition duration-200"
          >
            Featured
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
