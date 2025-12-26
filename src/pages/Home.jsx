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
import EmptyState from "../components/EmptyState";
import { PostCardSkeletonGrid } from "../components/skeletons/PostCardSkeleton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, BookOpen } from "lucide-react";
import { Button } from "../components/ui/button";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const { userRole } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsLoading(true);
    service.getPosts()
      .then((posts) => {
        if (posts?.documents) setPosts(posts.documents);
        else setPosts([]);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setPosts([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Show loading skeletons
  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg">
        <Container>
          <div className="py-12">
            <PostCardSkeletonGrid count={6} />
          </div>
        </Container>
      </div>
    );
  }

  // Show empty state
  if (posts.length === 0) {
    return (
      <div className="min-h-screen gradient-bg">
        <Container>
          <EmptyState 
            type="noPosts"
            title="No posts yet"
            description="Be the first to share your thoughts and ideas with the community."
            actionLabel={authStatus && (userRole === 'author' || userRole === 'admin') ? "Create your first post" : null}
            action={authStatus && (userRole === 'author' || userRole === 'admin') ? "/add-post" : null}
          />
        </Container>
      </div>
    );
  }

  // Get featured post (most recent)
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* Hero Section - Wix Style */}
      <section className="border-b border-border">
        <Container>
          <div className="py-20 md:py-32 lg:py-40">
            <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
              
              {/* Headline - Large, Bold, Black */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1] tracking-tight">
                Create a blog
                <br />
                <span className="text-primary">worth sharing</span>
              </h1>

              {/* Subheadline - Clean, Simple */}
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Get a full suite of intuitive design features and powerful tools to create a unique blog that leaves a lasting impression.
              </p>

              {/* Single CTA - Clean & Bold */}
              <div className="pt-6">
                {authStatus ? (
                  (userRole === 'author' || userRole === 'admin') && (
                    <Link to="/add-post">
                      <Button size="lg" className="h-14 px-8 text-lg font-semibold rounded-lg">
                        Start Blogging
                      </Button>
                    </Link>
                  )
                ) : (
                  <Link to="/signup">
                    <Button size="lg" className="h-14 px-8 text-lg font-semibold rounded-lg">
                      Start Blogging
                    </Button>
                  </Link>
                )}
                <p className="text-sm text-muted-foreground mt-4">
                  Free to start. Upgrade when you need.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Recent Posts - Clean Grid */}
      {posts.length > 0 && (
        <section className="py-20 md:py-28">
          <Container>
            <div className="max-w-7xl mx-auto">
              {/* Section Header - Simple */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Latest Articles
                </h2>
                <p className="text-lg text-muted-foreground">
                  {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
                </p>
              </div>
              
              {/* Posts Grid - Clean, Simple */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {posts.slice(0, 6).map((post, index) => (
                  <div 
                    key={post.$id}
                    className={`animate-fade-in delay-${Math.min((index + 1) * 100, 400)}`}
                  >
                    <PostCard {...post} />
                  </div>
                ))}
              </div>

              {/* View All Link - Simple */}
              {posts.length > 6 && (
                <div className="text-center mt-16">
                  <Link to="/all-posts">
                    <Button variant="outline" size="lg" className="h-12 px-8">
                      View All Articles
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section - Simple & Bold */}
      {!authStatus && (
        <section className="py-20 md:py-28 bg-primary/5 border-y border-border">
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Start your blog today
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of bloggers sharing their ideas and stories with the world.
              </p>
              <div>
                <Link to="/signup">
                  <Button size="lg" className="h-14 px-8 text-lg font-semibold">
                    Get Started for Free
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}

export default Home;