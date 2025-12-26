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
import { Container, RoleGuard } from "../components";
import PostForm from "../components/PostForm/PostForm.jsx";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { Edit3, Sparkles } from 'lucide-react';

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
    <RoleGuard allowedRoles={['author', 'admin']} requireVerifiedEmail={false}>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-950 dark:via-purple-950/40 dark:to-blue-950/40">
        {/* Modern Header Section */}
        <div className="border-b border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-10 shadow-sm dark:shadow-purple-900/10">
          <Container>
            <div className="py-8">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg dark:shadow-purple-500/20">
                  <Edit3 className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-gray-100 dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
                  Edit Post
                </h1>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                <span>Update your content with AI assistance</span>
              </p>
            </div>
          </Container>
        </div>

        {/* Form Section */}
        <Container>
          <div className="py-12">
            <PostForm post={post} />
          </div>
        </Container>
      </div>
    </RoleGuard>
  ) : null;
}

export default EditPost;


