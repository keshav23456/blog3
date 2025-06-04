// import React from 'react';
// import react from "../assets/react.svg";  // Renaming for clarity

// function Logo({ width = "100px" }) {
//   return (
//     <div>
//       <img src={react} alt="logo" style={{ width }} />
//     </div>
//   );
// }

// export default Logo;


import React from 'react';
import logoImage from "../assets/react.svg";

function Logo({ 
  width = "100px", 
  height = "auto", 
  className = "", 
  onClick = null,
  withText = false,
  textClassName = ""
}) {
  return (
    <div 
      className={`flex items-center ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <img 
        src={logoImage} 
        alt="Company Logo" 
        style={{ width, height }}
        className="object-contain"
      />
      {withText && (
        <span className={`ml-2 font-bold ${textClassName}`}>
          DevUI
        </span>
      )}
    </div>
  );
}

export default Logo;
