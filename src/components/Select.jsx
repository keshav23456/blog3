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
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 ml-1"
        >
          {label}
        </label>
      )}
      
      <select
        {...props}
        id={id}
        ref={ref}
        dir="ltr"
        style={{ direction: 'ltr', textAlign: 'left' }}
        className={`
          block w-full px-4 py-2.5
          text-base text-gray-900 dark:text-gray-100
          border border-gray-300 dark:border-gray-600 rounded-lg
          bg-white dark:bg-gray-800/50 bg-clip-padding
          focus:border-blue-500 dark:focus:border-purple-500 
          focus:ring-2 focus:ring-blue-200 dark:focus:ring-purple-500/20
          transition-all duration-200
          appearance-none cursor-pointer
          ${className}
        `}
      >
        {options.map((option) => (
          <option 
            key={option} 
            value={option}
            className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
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