// import React, { useState } from "react";
// import AuthService from "../appwrite/auth";
// import { Link, useNavigate } from "react-router-dom";
// import { login  } from "../store/authSlice";
// import { Button, Input, Logo } from "./index.js";
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";

// function Signup() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const {register, handleSubmit} = useForm();
//   const create = async (data) => {
//     setError("");
//     try {
//       const userData = await AuthService.createAccount(data);

//       if (userData) {
//       const userData = await AuthService.getCurrentUser();
//         if (userData) {
//           dispatch(login(userData));
//         }
//         navigate("/");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen  bg-slate-500   sm:px-6 lg:px-8 mx-auto ">
//       <div
//         className={`mx-auto  max-w-lg bg-gray-200 rounded-xl p-8 border border-black/10`}
//       >
//         <div className="mb-2 flex justify-center">
//           <span className="inline-block w-full max-w-[100px]">
//             <Logo width="80%" />
//           </span>
//         </div>
//         <h2 className="text-center text-2xl font-bold leading-tight text-gray-800 ">
//           Sign up to create account
//         </h2>
//         <p className="mt-2 text-center text-base text-black/60">
//           Already have an account?&nbsp;
//           <Link
//             to="/login"
//             className="font-medium text-primary transition-all duration-200 hover:underline"
//           >
//             Sign In
//           </Link>
//         </p>
//         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//         <form onSubmit={handleSubmit(async (data) => await create(data))} className="mt-8 space-y-6">
//           <div className="space-y-5">
//             <Input
//               label="Full Name: "
//               placeholder="Enter your full name"
//               className="w-full block border rounded-md focus:outline-none focus:ring focus:ring-primary-light"
//               {...register("name", {
//                 required: true,
//               })}
//             />
//             <Input
//               label="Email: "
//               placeholder="Enter your email"
//               type="email"
//               className="w-full block border rounded-md focus:outline-none focus:ring focus:ring-primary-light"
//               {...register("email", {
//                 required: true,
//                 validate: {
//                   matchPattern: (value) =>
//                     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                     "Email address must be a valid address",
//                 },
//               })}
//             />
//             <Input
//               label="Password: "
//               type="password"
//               placeholder="Enter your password"
//               className="w-full block border rounded-md focus:outline-none focus:ring focus:ring-primary-light"
//               {...register("password", {
//                 required: true,
//               })}
//             />
//             <Button type="submit" className="w-full">
//               Create Account
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;



import React, { useState } from "react";
import AuthService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const create = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const userData = await AuthService.createAccount(data);
      if (userData) {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 sm:p-10">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 mb-4">
              <Logo width="100%" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(create)} className="space-y-5">
            <Input
              label="Full name"
              placeholder="John Doe"
              error={errors.name?.message}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters"
                }
              })}
            />

            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
            />

            <Button
              type="submit"
              className="w-full py-2.5"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;