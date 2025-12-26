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
import { ArrowRight, Image as ImageIcon, Tag } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";

function PostCard({ $id, title, featuredimages, content = "", tags = [] }) {
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

  // Extract plain text from HTML content
  const getExcerpt = (htmlContent) => {
    const text = htmlContent.replace(/<[^>]*>/g, '');
    return text.length > 120 ? text.substring(0, 120) + '...' : text;
  };

  return (
    <Link 
      to={`/post/${$id}`} 
      className="group block h-full focus:outline-none"
      aria-label={`Read article: ${title}`}
    >
      <article className="h-full flex flex-col">
        {/* Image Container - Clean */}
        <div className="relative w-full aspect-[16/10] bg-muted overflow-hidden rounded-lg mb-4">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground">
              <ImageIcon className="w-10 h-10 mb-2 opacity-40" />
              <span className="text-xs">Image unavailable</span>
            </div>
          ) : (
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          )}
        </div>

        {/* Content - Clean & Simple */}
        <div className="flex-1 flex flex-col">
          {/* Title - Bold & Large */}
          <h3 className="text-xl md:text-2xl font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          
          {/* Excerpt - Light */}
          {content && (
            <p className="text-base text-muted-foreground line-clamp-2 mb-3">
              {getExcerpt(content)}
            </p>
          )}
          
          {/* Tags Display */}
          {tags && Array.isArray(tags) && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="text-xs px-2 py-0.5"
                >
                  #{tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          {/* Read Link - Simple */}
          <div className="text-sm text-foreground/60 group-hover:text-primary transition-colors duration-200 mt-auto">
            Read more →
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;