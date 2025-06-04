// import React from 'react'
// import { Login as LoginComponent } from '../components'

// function Login() {
//   return (
//     <div className='py-8'>
//         <LoginComponent/>
      
//     </div>
//   )
// }

// export default Login


import React from 'react'
import { Login as LoginComponent } from '../components'

function Login() {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-md mx-auto">
        {/* Enhanced login card */}
        <div className="bg-white rounded-xl shadow-md p-8 md:p-10 space-y-6">
          <h1 className="text-3xl font-serif font-bold text-gray-800 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-center">
            Sign in to access your account
          </p>
          <LoginComponent /> {/* ✅ Functionality remains unchanged */}
        </div>
      </div>
    </div>
  )
}

export default Login
