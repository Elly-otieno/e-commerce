import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import shop from "../../assets/images/shop.png";
import Button from "../general/Button";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    if (!email || !password) {
        toast.error('Incomplete Credentials')
        return;
    }
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex items-center justify-center p-4 w-full">
      <div className="bg-white flex w-full overflow-hidden">

        <div className="hidden md:flex md:w-1/2 bg-blue-100 justify-center items-center w-full">
          <img
            src={shop}
            alt="Shopping"
            className="object-cover  w-full"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-700">Log in to Exclusive</h2>
          <p className="text-gray-500 mb-6">Enter your details below</p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md mb-6 focus:ring-2 focus:ring-blue-500"
            />

            <Button 
            onclick={handleLogin}
            label="Log In"
            icon={ArrowRight}/>
          </form>

          {/* <div className="text-right mt-3">
            <a href="#" className="text-red-500 text-sm hover:underline">
              Forgot Password?
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
