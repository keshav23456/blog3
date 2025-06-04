// import React from "react";
// import { Signup as SignupComponents } from "../components";

// function Signup() {
//   return (
//     <div className="py-8">
//       <SignupComponents />
//     </div>
//   );
// }

// export default Signup;


import React from "react";
import { Signup as SignupComponents } from "../components";

function Signup() {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-md mx-auto">
        {/* Enhanced signup card */}
        <div className="bg-white rounded-xl shadow-md p-8 md:p-10 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Join our community today
            </p>
          </div>
          <SignupComponents /> {/* ✅ Functionality remains unchanged */}
          <div className="pt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
