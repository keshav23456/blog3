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

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;