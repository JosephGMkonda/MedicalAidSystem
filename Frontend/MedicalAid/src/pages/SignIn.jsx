import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { LoginUser,reset } from '../features/AunthSlice';


const SignIn = () => {

const [email, setEmail]  =  useState("");
const [password, setPassword] = useState("");
const [errors, setErrors] = useState({});
const dispatch = useDispatch();
const navigate = useNavigate()

const {user, isLoading, isError, isSuccess,message} = useSelector(
  (state) => state.auth
)

useEffect (() => {
  if(isError){
    alert(message)
  }

  if(isSuccess || user){
    navigate("/")
  }
  dispatch(reset)

},[user, isLoading, isError,isSuccess,message, navigate, dispatch])


const validate = () => {
  const validateErrors = {};
  if(!email) {
    validateErrors.email = "Email is required"

  }else if (!/\S+@\S+\.\S+/.test(email)) {
      validateErrors.email = "Email is invalid";
    }

  if(!password) {
    validateErrors.password = "Password is required"
  }

  setErrors(validateErrors)
  return Object.keys(validateErrors).length === 0;

}

const handleSubmit = (e) => {
  e.preventDefault()
  if(validate()){
    dispatch(LoginUser({email, password}))
  }

}




  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "focus:ring-blue-400"
              }`}
              
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}

          </div>

          
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange = {(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500" : "focus:ring-blue-400"
            }`}
              placeholder="Enter your password"
            />
              {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

        
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
