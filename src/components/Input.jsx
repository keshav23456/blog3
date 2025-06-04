// import React, { forwardRef, useId } from "react";
// //forward ref
// //dekho tum component yaha bana rahe ho but tumhe reference kisi aur file mein
// //milenga so for refernce purpose it is used
// //login form meim input wali hai bakchdi bcoz it is used multiple with different status
// // that why forwardRef is used

// const Input = React.forwardRef(function Input(
//   { label, type = "text", className = "", id, ...props },
//   ref
// ) {
//   const generatedId = useId(); // Generate an ID if not provided
//   const inputId = id || generatedId; // Use provided ID or fallback

//   return (
//     <div className="w-full">
//       {label && (
//         <label className="inline-block mb-1 pl-1" htmlFor={inputId}>
//           {label}
//         </label>
//       )}
//       <input
//         type={type}
//         id={inputId}
//         ref={ref}
//         className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
//         {...props}
//       />
//     </div>
//   );
// });

// export default Input;



import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    id,
    error,
    helperText,
    startIcon,
    endIcon,
    fullWidth = true,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`${fullWidth ? "w-full" : "w-fit"}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {startIcon}
          </div>
        )}
        
        <input
          type={type}
          id={inputId}
          ref={ref}
          className={`
            block w-full rounded-lg border
            ${error ? "border-red-500" : "border-gray-300"}
            ${startIcon ? "pl-10" : "pl-3"}
            ${endIcon ? "pr-10" : "pr-3"}
            py-2 text-gray-900 shadow-sm
            focus:outline-none focus:ring-2
            ${error ? "focus:ring-red-500" : "focus:ring-blue-500"}
            focus:border-transparent
            transition-all duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${className}
          `}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />
        
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {endIcon}
          </div>
        )}
      </div>
      
      {helperText && (
        <p className={`mt-1 text-sm ${error ? "text-red-600" : "text-gray-500"}`}>
          {helperText}
        </p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

export default Input;