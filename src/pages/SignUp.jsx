import React, {useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Optional: icons for show/hide
import api from "../config/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../app/features";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const [formType, setFormType] = useState("register"); 
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleSubmit = async(e) => {
      try {
        console.log(formData);
        
        e.preventDefault()
        const {data}=await api.post(`/api/users/${formType}`,formData)

        if(data){
          toast.success(data.message)
          dispatch(login(data))
          const token = data.token
          localStorage.setItem('token',token)
          navigate('/')
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message)
      }
  };

   

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center capitalize">
          {formType}
        </h2>

        {formType === "register" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <span
            onClick={togglePassword}
            className="absolute right-3 top-9.5 cursor-pointer text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 cursor-pointer text-white py-2 rounded hover:bg-emerald-600 transition mb-4"
        >
          {formType === "register" ? "register" : "Login"}
        </button>

        <p className="text-center text-gray-500">
          {formType === "register"
            ? "Already have an account? "
            : "Don't have an account? "}
          <span
            onClick={() =>
              setFormType(formType === "register" ? "login" : "register")
            }
            className="text-emerald-500 cursor-pointer hover:underline"
          >
            {formType === "register" ? "Login" : "register"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
