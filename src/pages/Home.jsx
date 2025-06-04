// import React, { useEffect, useState } from "react";
// import service from "../appwrite/config";
// import { Container, PostCard } from "../components";

// function Home() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     service.getPosts()
//       .then((posts) => {
//         if (posts && posts.documents) {
//           setPosts(posts.documents);
//         } else {
//           setPosts([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching posts:", error);
//         setPosts([]);
//       });
//   }, []);

//   if (posts.length === 0) {
//     return (
//       <div className="w-full py-8 mt-4 text-center">
//         <Container>
//           <div className="flex flex-wrap">
//             <div className="p-2 w-full">
//               <h1 className="text-2xl font-bold hover:text-gray-500">
//                 No posts available. Create one now!
//               </h1>
//             </div>
//           </div>
//         </Container>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full py-8">
//       <Container>
//         <div className="flex flex-wrap">
//           {posts.map((post) => (
//             <div key={post.$id} className="p-2 w-1/4">
//               <PostCard {...post} />
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default Home;



import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  // ✅ Functionality unchanged
  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts?.documents) setPosts(posts.documents);
      else setPosts([]);
    }).catch((error) => {
      console.error("Error fetching posts:", error);
      setPosts([]);
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif mb-4">
              No posts yet.
            </h1>
            <p className="text-gray-600 text-lg">
              Start writing your first post today!
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-gray-50">
      <Container>
        {/* Modern grid with subtle animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div 
              key={post.$id} 
              className="transition-all duration-300 hover:shadow-md hover:-translate-y-1 rounded-xl overflow-hidden"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;