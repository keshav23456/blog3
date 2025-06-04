// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import authService from "./appwrite/auth";
// import "./App.css";
// import { logout } from "./store/authSlice";
// import { login } from "./store/authSlice";
// import { Header } from "./components";
// import { Footer } from "./components";
// import { Outlet } from "react-router-dom";

// function App() {
//   const [loading, setLoading] = useState(true);//useeffect lake true kartenge
//   const dispatch = useDispatch();//global mein changes honge

//   useEffect(() => {
//     authService.getCurrentUser()
//       .then((userData) => {
//         if (userData) {
//           dispatch(login({userData}));
//         } else {
//           dispatch(logout());//kuch na kuch to ho login mrin false hoga 
//           //logout mein true ho jayega
//         }
//       })
//       .finally(() => setLoading(false));
//   }, []);
//   //conditional loading
//   return !loading ? (
//     <div className="min-h-sc flex-wrap content-between bg-gray">
//       <div className="w-full block">
//         <Header />
//         <main>
//            <Outlet />
//            {/* //react router dom  se outlet aayega*/}
//         </main>
//         <Footer />
//       </div>
//     </div>
//   ) : null;
// }

// export default App;

// //database ya network se puchne ke liye loading bana lena is good bcoz it will allow conditional rendering



import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { logout, login } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        setError("Failed to check authentication status");
        console.error("Auth check error:", err);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-md bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;