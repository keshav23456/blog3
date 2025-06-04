// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function Protected({ children, authentication = true }) {
//   const navigate = useNavigate();
//   const [loader, setLoader] = useState(true);
//   const authStatus = useSelector(state => state.auth.status);
//   useEffect(() => {
//     // if (authentication) {
//       if (authentication && authStatus !== authentication) {
//         navigate("/login");
//       } else if (!authentication && authStatus !== authentication) {
//         navigate("/");
//       }
//       setLoader(false);
   
// }, [authStatus, navigate, authentication]);


//   return loader ? <h1>Loading...</h1> : <>{children}</>
// }



import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <h1 className="mt-4 text-xl font-medium text-gray-800">Verifying access...</h1>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
}