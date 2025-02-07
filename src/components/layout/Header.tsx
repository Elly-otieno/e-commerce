import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ShoppingCart, Menu, X, LogOut, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const cartItemCount = 5; // Placeholder for now

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="shadow-md sticky top-0 z-50 w-full bg-slate-200">
      <div className="py-4 flex justify-between items-center xl:mx-20 md:mx-2 mx-4">
        {/* Logo/Brand Name */}
        <div className="text-2xl font-bold">
          <Link to="/">Exclusive</Link>
        </div>

        {/* Navigation Links for large screens */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-gray-200 transition duration-200">
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-gray-200 transition duration-200"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-200 transition duration-200"
          >
            About
          </Link>

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="hover:text-gray-200 transition duration-200"
            >
              {/* <LogOut size={20} /> */}
              <span>Sign Out</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="hover:text-gray-200 transition duration-200 hover:underline"
            >
              {/* <User size={20} /> */}
              <span>Sign Up</span>
            </Link>
          )}
        </div>

        {/* Cart Icon */}
        <div className="relative">
          <Link to="/cart">
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-2 py-1">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
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
            className="block text-white hover:text-gray-200 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block text-white hover:text-gray-200 transition duration-200"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="block text-white hover:text-gray-200 transition duration-200"
          >
            About
          </Link>

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="block text-white hover:text-gray-200 transition duration-200"
            >
              <LogOut size={20} />
            </button>
          ) : (
            <Link
              to="/login"
              className="block text-white hover:text-gray-200 transition duration-200"
            >
              <User size={20} />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
