// import React from "react";
// import { Link } from "react-router-dom";
// import Logo from "../Logo";

// function Footer() {
//   return (
//     <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
//       <div className="relative z-10 mx-auto max-w-7xl px-4">
//         <div className="-m-6 flex flex-wrap">
//           <div className="w-full p-6 md:w-1/2 lg:w-5/12">
//             <div className="flex h-full flex-col justify-between">
//               <div className="mb-4 inline-flex items-center">
//                 <Logo width="100px" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">
//                   &copy; {new Date().getFullYear()}  Copyright 2023. All Rights Reserved by DevUI.
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//             <div className="h-full">
//               <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                 Company
//               </h3>
//               <ul>
//                 <li className="mb-4">
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/"
//                   >
//                     Features
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/"
//                   >
//                     Pricing
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/"
//                   >
//                     Affiliate Program
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/"
//                   >
//                     Press Kit
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//             <div className="h-full">
//               <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                 Support
//               </h3>
//               <ul>
//                 <li className="mb-4">
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/"
//                   >
//                     Account
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/"
//                   >
//                     Help
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/"
//                   >
//                     Contact Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/"
//                   >
//                     Customer Support
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="w-full p-6 md:w-1/2 lg:w-3/12">
//             <div className="h-full">
//               <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                 Legals
//               </h3>
//               <ul>
//                 <li className="mb-4">
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/"
//                   >
//                     Terms &amp; Conditions
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/"
//                   >
//                     Licensing
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Footer;


import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        {/* Simple Footer Content */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Logo */}
          <div>
            <Logo size="default" />
          </div>

          {/* Links - Simple & Clean */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-center md:text-left">
            {['About', 'Contact', 'Privacy', 'Terms'].map((item) => (
              <Link
                key={item}
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright - Minimal */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Apogee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;