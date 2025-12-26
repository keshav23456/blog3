// import React from "react";
// import { useDispatch } from "react-redux";
// import authService from "../../appwrite/auth";
// import { logout } from "../../store/authSlice";

// function LogoutBtn() {
//   const dispatch = useDispatch();
//   const logoutHandler = () => {
//     // logout ya login mostly promise hote hai
//     authService.logout().then(() => {
//       dispatch(logout());
//     });
//   };
//   return (
//     <button
//       className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
//       onClick={logoutHandler}
//     >
//       Logout
//     </button>
//   );
// }

// export default LogoutBtn;



import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { LogOut } from "lucide-react";

function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium 
        text-white bg-destructive hover:bg-destructive/90
        rounded-lg transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2
        dark:focus:ring-offset-background
        ${className}
      `}
      onClick={logoutHandler}
      aria-label="Logout"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}

export default LogoutBtn;