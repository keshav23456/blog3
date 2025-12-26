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
import EmptyState from "../components/EmptyState";
import { PostCardSkeletonGrid } from "../components/skeletons/PostCardSkeleton";
import { Search, Grid3x3, LayoutList, Filter, SortAsc } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await appwriteService.getPosts([]);
        if (data) {
          setPosts(data.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter posts based on search query (including tags)
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    const matchesTitle = post.title.toLowerCase().includes(query);
    const matchesContent = post.content?.toLowerCase().includes(query);
    
    // Check if tags exist and match search query
    const matchesTags = post.tags?.some(tag => 
      tag.toLowerCase().includes(query)
    ) || false;
    
    return matchesTitle || matchesContent || matchesTags;
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg">
        <Container>
          <div className="py-12">
            {/* Header Skeleton */}
            <div className="mb-8 space-y-4">
              <div className="h-10 w-64 bg-muted rounded animate-pulse" />
              <div className="h-12 w-full bg-muted rounded animate-pulse" />
            </div>
            <PostCardSkeletonGrid count={9} />
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
            description="Be the first to create a post and share your thoughts with the community."
          />
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <Container>
        <div className="py-16 md:py-24 space-y-12">
          {/* Header - Clean & Simple */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
              All Articles
            </h1>
            <p className="text-xl text-muted-foreground">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            </p>

            {/* Search Bar - Clean */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base border-2 focus-visible:border-primary focus-visible:ring-0"
                aria-label="Search articles"
              />
            </div>
          </div>

          {/* Posts Grid - Clean & Spacious */}
          {filteredPosts.length === 0 ? (
            <EmptyState 
              type="noSearchResults"
              title="No articles found"
              description={`No articles match "${searchQuery}". Try different keywords.`}
              actionLabel="Clear search"
              action={() => setSearchQuery("")}
            />
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filteredPosts.map((post, index) => (
                  <div 
                    key={post.$id}
                    className={`animate-fade-in delay-${Math.min((index % 6) * 100, 400)}`}
                  >
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;