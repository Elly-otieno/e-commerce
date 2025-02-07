// import React from 'react'; 
import { Link } from 'react-router'; 
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Send
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 text-white xl:px-20 md:px-2 px-4 w-full">
      <div className="mx-auto flex flex-col md:flex-row  items-start md:items-center">

        <div className="mb-8 md:mb-0 mr-auto">
          <h4 className="text-lg font-semibold mb-4">Exclusive</h4>
          <div className="mt-6">
            <p className="mb-2">Subscribe</p>
            <div className="flex relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="text-white font-semibold p-2  absolute right-0">
                <Send className="h-6 w-6" />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-400">Get 10% off your first order</p>
          </div>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8 md:mb-0 ">
          <div>
            <h6 className="font-semibold mb-2">Account</h6>
            <ul className="space-y-1">
              <li><Link to="/my-account">My Account</Link></li>
              <li><Link to="/login">Login / Register</Link></li>
              <li><Link to="/cart">
                <div className="flex items-center">
                  <span>Cart</span>
                </div>
              </Link></li>
              <li><Link to="/wishlist">
                <div className="flex items-center">
                  <span>Wishlist</span>
                </div>
              </Link></li>
              <li><Link to="/shop">Shop</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold mb-2">Quick Link</h6>
            <ul className="space-y-1">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use">Terms Of Use</Link></li>
              <li><Link to="/faq">
                <div className="flex items-center">
                  <span>FAQ</span>
                </div>
              </Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold mb-2">Support</h6>
            <ul className="space-y-1">
              <li><a href="mailto:okothsteve@gmail.com">exclusive@gmail.com</a></li>
              <li><a href="tel:+254712609749">+254712609749</a></li>
              <li><p>111 Back Street, RiverRoad, Nairobi.</p></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-center mt-8 pt-8 border-t border-gray-800">
        <p>&copy; Copyright Exclusive {new Date().getFullYear()}. All rights reserved</p>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-6 w-6" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;