// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config.js";
// import { Button, Container } from "../components";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//   const [post, setPost] = useState(null);
//   const [image, setImage] = useState('');
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const userData = useSelector((state) => state.auth.userData);
  
//   const isAuthor = post && userData ? post.userId === userData.$id : false;

//   useEffect(() => {
//     if (slug) {
//       appwriteService.getPost(slug)
//         .then((post) => {
//           if (post && post.$id) {
//             setPost(post);
//           } else {
//             navigate("/");
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching post:", error);
//           navigate("/");
//         });
//     } else {
//       navigate("/");
//     }
//   }, [slug, navigate]);

//   const deletePost = () => {
//     if (post && post.$id) {
//       // Using slug instead of $id for consistency with your service method
//       appwriteService.deletePost(slug).then((status) => {
//         if (status.success) {
//           // Make sure to use the same property name as in your data model
//           appwriteService.deleteFile(post.featuredimages);
//           navigate("/");
//         }
//       }).catch((error) => {
//         console.error("Error deleting post:", error);
//       });
//     }
//   };

//   useEffect(() => {
//     const fetchImage = async () => {
//       // Check if post exists and has featuredimages before fetching
//       if (post && post.featuredimages) {
//         try {
//           const url = await appwriteService.getFilePreview(post.featuredimages);
//           setImage(url);
//         } catch (error) {
//           console.error("Error fetching image:", error);
//         }
//       }
//     };
    
//     fetchImage();
//   }, [post]); // Add post as a dependency since we're using post.featuredimages

//   return post ? (
//     <div className="py-8">
//       <Container>
//         <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//           <img
//             src={image ? image : ""}
//             alt={post.title}
//             className="rounded-xl"
//           />

//           {isAuthor && (
//             <div className="absolute right-6 top-6">
//               <Link to={`/edit-post/${post.$id}`}>
//                 <Button bgColor="bg-green-500" className="mr-3">
//                   Edit
//                 </Button>
//               </Link>
//               <Button bgColor="bg-red-500" onClick={deletePost}>
//                 Delete
//               </Button>
//             </div>
//           )}
//         </div>
//         <div className="w-full mb-6">
//           <h1 className="text-2xl font-bold">{post.title}</h1>
//         </div>
//         <div className="browser-css">{parse(post.content)}</div>
//       </Container>
//     </div>
//   ) : null;
// }


import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { Container, SEO } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { PostPageSkeleton } from "../components/skeletons/PostPageSkeleton";
import { Button } from "../components/ui/button";
import { Edit, Trash2, ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { usePostAnalytics } from "../hooks/usePostAnalytics";
import ReadingProgress from "../components/ReadingProgress";
import SocialShare from "../components/SocialShare";
import TableOfContents from "../components/TableOfContents";
import { formatReadingTime, getReadingStats } from "../utils/readingTime";

export default function Post() {
  const [post, setPost] = useState(null);
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { userRole } = useSelector((state) => state.auth);
  
  // Track post views and read time
  usePostAnalytics(slug);
  
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const isAdmin = userRole === 'admin';
  const canEdit = isAuthor || isAdmin;
  const canDelete = isAuthor || isAdmin;

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      appwriteService.getPost(slug)
        .then((post) => {
          if (post && post.$id) {
            setPost(post);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          navigate("/");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!post || !post.$id) return;
    
    if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const status = await appwriteService.deletePost(slug);
      if (status.success) {
        if (post.featuredimages) {
          await appwriteService.deleteFile(post.featuredimages);
        }
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (post && post.featuredimages) {
        try {
          const url = await appwriteService.getFilePreview(post.featuredimages);
          setImage(url);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };
    
    fetchImage();
  }, [post]);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Unknown date';
    }
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return <PostPageSkeleton />;
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <SEO
        title={`${post.title} | Apogee`}
        description={post.content.replace(/<[^>]*>/g, '').substring(0, 160)}
        image={image}
        article={true}
        publishedTime={post.$createdAt}
        modifiedTime={post.$updatedAt}
        tags={post.tags || []}
        canonical={`${window.location.origin}/post/${post.$id}`}
      />
      <div className="min-h-screen gradient-bg">
        {/* Back Button */}
        <div className="border-b border-border">
          <Container>
            <div className="py-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </Container>
      </div>

      {/* Featured Image */}
      {image && (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-muted">
          <img
            src={image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <Container>
        <article className="max-w-4xl mx-auto -mt-32 relative z-10">
          {/* Title & Meta Card */}
          <div className="card-elevated p-8 md:p-12 mb-8 animate-fade-in">
            {/* Status Badge */}
            {post.status && (
              <Badge 
                variant={post.status === 'active' ? 'default' : 'secondary'}
                className="mb-4"
              >
                {post.status}
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.$createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{Math.ceil(post.content?.length / 1000)} min read</span>
              </div>
            </div>

            {/* Tags Display */}
            {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                  {post.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={sharePost}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>

              {canEdit && (
                <Link to={`/edit-post/${post.$id}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
              )}

              {canDelete && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={deletePost}
                  disabled={isDeleting}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              )}
            </div>
          </div>

          {/* Post Content */}
          <div className="card-elevated p-8 md:p-12 animate-fade-in delay-100">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-p:text-foreground/90 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-muted prose-pre:border prose-pre:border-border
                prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1
                prose-img:rounded-xl prose-img:shadow-lg
                prose-hr:border-border
              "
            >
              {parse(post.content)}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 mb-8 flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/all-posts')}
            >
              All Articles
            </Button>
          </div>

          {/* Social Share - Full */}
          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Share this article</h3>
            <SocialShare
              url={window.location.href}
              title={post.title}
              description={post.content.replace(/<[^>]*>/g, '').substring(0, 200)}
              variant="default"
            />
          </div>
        </article>

        {/* Floating Social Share */}
        <SocialShare
          url={window.location.href}
          title={post.title}
          description={post.content.replace(/<[^>]*>/g, '').substring(0, 200)}
          variant="floating"
        />
      </Container>
      </div>
    </>
  );
}