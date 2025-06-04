// import React, { useState, useEffect } from "react";
// import appwriteService from "../appwrite/config.js";
// import { Container, PostCard } from "../components";

// function AllPost() {
//   const [posts, setPosts] = useState([])
//   // useEffect(()=>{},[]);
//   useEffect(() => {
//     const fetchData = async()=> {
//       const data = await appwriteService.getPosts([])
//       if(data) {
//         setPosts(data.documents);
//       }
//     }
//     fetchData();
  
//   },[])
//   return (
//     <div className="w-full py-8">
//       <Container>
//         <div className="flex flex-wrap">
//           {posts?.map((post) => (
//             <div key={post.$id} className="p-2 w-1/4">
//               <PostCard {...post} />
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default AllPost;


import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config.js";
import { Container, PostCard } from "../components";

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await appwriteService.getPosts([]);
      if (data) {
        setPosts(data.documents);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <Container>
        {/* Modern grid layout with hover animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts?.map((post) => (
            <div 
              key={post.$id} 
              className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>

        {/* Empty state - matches Home.jsx styling */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              No posts found
            </h1>
            <p className="text-gray-600 text-lg">
              Create your first post to get started!
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPost;