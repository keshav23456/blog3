// import React from "react";

// export default function Button({
//   children,
//   type = "button",
//   bgColor = "bg-blue-600",
//   textColor = "text-white",
//   className = "",
//   ...props
//   //why class name khali and props spreaded 
//   //classname using backticks
  
// }) {
//   return (
//     <button
//     className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${props.className || ""}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }


import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  hoverBgColor = "hover:bg-blue-700",
  textColor = "text-white",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-4 py-2 rounded-lg 
        transition-colors duration-200 
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${bgColor} ${hoverBgColor} ${textColor} 
        ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
