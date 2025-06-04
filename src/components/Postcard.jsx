// import React, { useEffect, useState } from "react";
// import appwriteService from "../appwrite/config";
// import { Link } from "react-router-dom";

// function Postcard({ $id, title, featuredimages }) {//appwrite ka syntax hai $id wala
//   const [image,setImage]=useState('')
//   useEffect(()=>{
//     const fetchImage = async()=>{
//       const data = await appwriteService.getFilePreview(featuredimages);
//       setImage(data);
//     }
//     fetchImage();
//   },[])
//   return (
//     <Link to={`/post/${$id}`}>
//       <div className="w-full bg-gray-400 rounded-4xl p-4 ">
//         <div className="w-full justify-center mb-4 ">
//           <img
//             src={image}
//             alt={title}
//             className="rounded-xl"
//           />
//         </div>
//         <h2 className="text-xl font-bold">{title}</h2>
//       </div>
//     </Link>
//   );
// }

// export default Postcard;


import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimages }) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setIsLoading(true);
        if (featuredimages) {
          const data = await appwriteService.getFilePreview(featuredimages);
          setImage(data);
        }
      } catch (error) {
        console.error("Error loading image:", error);
        setError("Failed to load image");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [featuredimages]);

  return (
    <Link to={`/post/${$id}`} className="block h-full">
      <div className="h-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative aspect-w-16 aspect-h-9 bg-gray-100">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gray-200 w-full h-full"></div>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
              <span>Image unavailable</span>
            </div>
          ) : (
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-500 hover:text-gray-600 transition-colors">
            Read more →
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;