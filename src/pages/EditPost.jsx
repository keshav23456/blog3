// import React, { useEffect, useState } from "react";
// import { Container } from "../components";
// import PostForm from "../components/post-form/PostForm.jsx";
// import appwriteService from "../appwrite/config";
// import { useNavigate, useParams } from "react-router-dom";

// function EditPost() {
//   const [post, setPosts] = useState(null);
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (slug) {
//       appwriteService.getPost(slug).then((post) => {
//         if (post) {
//           setPosts(post);
//         }
//       });
//     } else {
//       navigate("/");
//     }
//   }, [slug, navigate]);
//   return post ? (
//     <div className="py-8">
//       <Container>
//         <PostForm post={post} />
//       </Container>
//     </div>
//   ) : null;
// }

// export default EditPost;


import React, { useEffect, useState } from "react";
import { Container } from "../components";
import PostForm from "../components/post-form/PostForm.jsx";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <Container>
        {/* Enhanced form container */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-6 border-b pb-4">
            Edit Post
          </h1>
          <PostForm post={post} /> {/* ✅ Functionality unchanged */}
        </div>
      </Container>
    </div>
  ) : null;
}

export default EditPost;


