// import React, { useId } from "react";

// function Select({
//   options,
//   label,
//   className,
//   ...props
// },ref){
//   const id = useId()
//   return (
//       <div className='w-full'>
//           {label && <label htmlFor={id} className=''></label>}
//           <select
//           {...props}
//           id={id}
//           ref={ref}
//           className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
// {/* Loop through options, ensuring it is optional */}
//               {options?.map((option) =>(
//                   <option key={option} value={option}>
//                       {option}
//                   </option>
//               ))}
//           </select>
//       </div>
//   )
// }
// export default React.forwardRef(Select);
// //aasan wala syntax


import React, { useId } from "react";

const Select = React.forwardRef(({
  options = [],
  label,
  className = "",
  ...props
}, ref) => {
  const id = useId();
  
  return (
    <div className="w-full space-y-1">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 ml-1"
        >
          {label}
        </label>
      )}
      
      <select
        {...props}
        id={id}
        ref={ref}
        className={`
          block w-full px-4 py-2.5
          text-base text-gray-900
          border border-gray-300 rounded-lg
          bg-white bg-clip-padding
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200
          transition-all duration-200
          appearance-none
          ${className}
        `}
      >
        {options.map((option) => (
          <option 
            key={option} 
            value={option}
            className="text-gray-700"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.displayName = "Select"; // For debugging purposes
export default Select;