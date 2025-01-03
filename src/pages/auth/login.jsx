import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const staticUser = {
    email: "user@gmail.com",
    password: "123",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === staticUser.email && password === staticUser.password) {
      alert("Login successful!");
      localStorage.setItem("user", JSON.stringify(staticUser)); 
      navigate("/dashboard");
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
       
      <div className="w-1/2 hidden lg:flex flex-col justify-center items-center bg-gray-200">
  <img
    src="/flight.jpg"
    alt="Illustration"
    className="object-cover w-full h-full min-h-full object-left"
  />
</div>


        
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center items-center">
          <div className="text-center mb-8 w-full">
            <h3 className="text-4xl font-bold text-gray-800">Welcome Back !</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
            <div>
              <label className="block font-medium text-xl text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-800"
              />
            </div>
            <div>
              <label className="block font-medium text-xl text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {passwordVisible ? (
                    <FaEye className="text-gray-600" />
                  ) : (
                    <FaEyeSlash className="text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="peer w-4 h-4 border-2 border-gray-600 rounded-sm focus:outline-none focus:ring-0 checked:bg-black checked:border-black"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-gray-600 peer-checked:text-black"
                >
                  Remember for 30 days
                </label>
              </div>
              <Link to="/forgot-password" className="text-gray-500 text-sm">
                Forgot password?
              </Link>
            </div>

            
            <Button type="submit" className="w-full py-5 bg-gray-800 text-white  rounded-full mt-6">
              Log In
            </Button>

            <Button className="w-full py-5 bg-white text-gray-800 border border-gray-300 rounded-full flex items-center justify-center space-x-2 mt-4">
              <img src="/goggle.png" alt="Google" className="w-5 h-5" />
              <span className="font-bold">Log in with Google</span>
            </Button>
          </form><br /><br />

          <p className="text-center mt-6 text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
